const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Carrega variáveis do .env local se existir
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^['"](.*)['"]$/, '$1');
        if (!process.env[key]) process.env[key] = val;
      }
    }
  });
}

const PORT = process.env.PORT || 3000;
const XPAY_API_KEY = process.env.XPAY_API_KEY || '';
const XPAY_BASE_URL = 'https://api.xpaybrasil.com/v1';

// Diretório base dos arquivos estáticos da loja
const NETLIFY_DIR = path.join(__dirname, 'SITE_PRONTO_NETLIFY');
const STATIC_ROOT = path.join(__dirname, 'Cafe', 'delivery-entregas.netlify.app');
const FLOR_DIR = path.join(STATIC_ROOT, 'flor');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

// Utilitário para requisições HTTPS
function httpsRequest(targetUrl, options, postData) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const reqOptions = {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    if (postData) {
      reqOptions.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = data ? JSON.parse(data) : {};
          resolve({ statusCode: res.statusCode, data: json, raw: data });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: null, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

// Ler body da requisição HTTP
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2e6) { // 2MB max
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Resposta JSON padronizada
function sendJson(res, statusCode, payload) {
  const jsonStr = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-KEY'
  });
  res.end(jsonStr);
}

// Validador simples de CPF
function isValidCPF(cpf) {
  if (!cpf) return false;
  const clean = String(cpf).replace(/\D/g, '');
  if (clean.length !== 11 || /^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(clean.charAt(i), 10) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(clean.charAt(i), 10) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(clean.charAt(10), 10);
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-KEY'
    });
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname.replace(/\/+/g, '/');

  // Redirecionamento da raiz "/" para "/flor/"
  if (pathname === '/' || pathname === '') {
    res.writeHead(302, { 'Location': '/flor/' });
    return res.end();
  }

  // ==========================================
  // ROTAS DE API (XPAY BRASIL)
  // Suporta tanto /api/... quanto /flor/api/...
  // ==========================================

  // 1. Criar cobrança PIX
  if (req.method === 'POST' && (
    pathname === '/api/create-pix' ||
    pathname === '/flor/api/create-pix' ||
    pathname === '/.netlify/functions/create-pix'
  )) {
    try {
      const body = await readBody(req);
      const { amount, customer, items, externalId, cardMessage, deliveryShift } = body;

      // Validação de valor mínimo da XPay: R$ 5,00 (500 centavos)
      const cents = Math.round(Number(amount) || 0);
      if (cents < 500) {
        return sendJson(res, 400, {
          success: false,
          error: 'O valor mínimo para cobrança PIX é de R$ 5,00.'
        });
      }

      if (!customer || !customer.name || !customer.taxId || !customer.phone) {
        return sendJson(res, 400, {
          success: false,
          error: 'Por favor, preencha os dados do cliente (Nome, CPF e Telefone).'
        });
      }

      const cleanCpf = String(customer.taxId).replace(/\D/g, '');
      if (!isValidCPF(cleanCpf)) {
        return sendJson(res, 400, {
          success: false,
          error: 'CPF inválido. Por favor, confira os números digitados.'
        });
      }

      const cleanPhone = String(customer.phone).replace(/\D/g, '');
      const cleanCep = String(customer.postalCode || '').replace(/\D/g, '');

      const xpayPayload = {
        amount: cents,
        expiresIn: 1800, // 30 minutos
        externalId: externalId || `pedido_${Date.now()}`,
        customer: {
          taxId: cleanCpf,
          name: customer.name.trim(),
          email: customer.email ? customer.email.trim() : `cliente_${cleanCpf.slice(-4)}@bellaaurora.com.br`,
          phone: cleanPhone || '11999999999',
          postalCode: cleanCep || '01001000',
          address: (customer.address || 'Não informado').trim(),
          number: (customer.number || 'S/N').trim(),
          district: (customer.district || 'Centro').trim(),
          line1: (customer.line1 || '').trim()
        }
      };

      console.log(`[XPAY] Criando cobrança PIX de R$ ${(cents / 100).toFixed(2)} para ${customer.name}...`);

      const xpayRes = await httpsRequest(
        `${XPAY_BASE_URL}/charge/pix`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': XPAY_API_KEY
          }
        },
        JSON.stringify(xpayPayload)
      );

      if (xpayRes.statusCode !== 201 && xpayRes.statusCode !== 200) {
        console.error('[XPAY Error]', xpayRes.statusCode, xpayRes.raw);
        const errMsg = (xpayRes.data && xpayRes.data.errors && xpayRes.data.errors[0]?.description)
          || (xpayRes.data && xpayRes.data.message)
          || 'Erro ao gerar o PIX junto ao gateway.';
        return sendJson(res, xpayRes.statusCode || 400, {
          success: false,
          error: errMsg
        });
      }

      const charge = xpayRes.data.data || xpayRes.data;

      return sendJson(res, 200, {
        success: true,
        chargeId: charge.id,
        status: charge.status || 'PROCESSING',
        amount: charge.amount,
        brCode: charge.brCode,
        brCodeBase64: charge.brCodeBase64,
        url: charge.url,
        expiresAt: charge.expiresAt
      });
    } catch (err) {
      console.error('[Create PIX Internal Error]', err);
      return sendJson(res, 500, {
        success: false,
        error: 'Erro interno ao processar cobrança PIX: ' + err.message
      });
    }
  }

  // 2. Checar status da cobrança
  let chargeIdToCheck = null;
  const checkStatusMatch = pathname.match(/^\/(?:flor\/)?api\/check-status\/([^/]+)$/);
  if (checkStatusMatch) {
    chargeIdToCheck = checkStatusMatch[1];
  } else if (pathname === '/.netlify/functions/check-status') {
    chargeIdToCheck = parsedUrl.query.id;
  }

  if (req.method === 'GET' && chargeIdToCheck) {
    try {
      const chargeId = chargeIdToCheck;
      const xpayRes = await httpsRequest(
        `${XPAY_BASE_URL}/charge/${encodeURIComponent(chargeId)}`,
        {
          method: 'GET',
          headers: {
            'X-API-KEY': XPAY_API_KEY
          }
        }
      );

      if (xpayRes.statusCode !== 200) {
        return sendJson(res, xpayRes.statusCode, {
          success: false,
          error: 'Cobrança não encontrada ou erro no gateway.'
        });
      }

      const chargeData = (xpayRes.data && xpayRes.data.data) || xpayRes.data;
      const paymentStatus = chargeData.paymentStatus || chargeData.status;

      // Status possíveis: PAID, COMPLETED, PROCESSING, OPEN, EXPIRED, CANCELLED
      const isPaid = (paymentStatus === 'PAID' || paymentStatus === 'COMPLETED' || paymentStatus === 'CONFIRMED');

      return sendJson(res, 200, {
        success: true,
        chargeId: chargeData.id,
        status: paymentStatus,
        isPaid: isPaid
      });
    } catch (err) {
      console.error('[Check Status Error]', err);
      return sendJson(res, 500, {
        success: false,
        error: err.message
      });
    }
  }

  // 3. Healthcheck da aplicação
  if (pathname === '/api/health' || pathname === '/flor/api/health') {
    return sendJson(res, 200, {
      status: 'ok',
      service: 'Bella Aurora Cestas - Gateway XPay Brasil',
      timestamp: new Date().toISOString()
    });
  }

  // ==========================================
  // SERVIR ARQUIVOS ESTÁTICOS
  // ==========================================
  if (req.method === 'GET' || req.method === 'HEAD') {
    let relativePath = decodeURIComponent(pathname);

    // Prioriza arquivos da pasta limpa SITE_PRONTO_NETLIFY
    let filePath = path.join(NETLIFY_DIR, relativePath.replace(/^\/flor\//, ''));
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      } else if (relativePath.startsWith('/flor/')) {
        filePath = path.join(FLOR_DIR, relativePath.replace(/^\/flor\//, ''));
      } else {
        filePath = path.join(STATIC_ROOT, relativePath);
        if (!fs.existsSync(filePath)) {
          filePath = path.join(FLOR_DIR, relativePath);
        }
      }
    }

    // Se for diretório, procura index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });

      if (req.method === 'HEAD') return res.end();
      return fs.createReadStream(filePath).pipe(res);
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 - Página não encontrada</h1><p><a href="/flor/">Voltar para a loja</a></p>');
    return;
  }

  res.writeHead(405);
  res.end('Method Not Allowed');
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`✨ Bella Aurora Cestas de Café - Loja & Gateway Ativos`);
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`🛒 Acesse a Loja em:    http://localhost:${PORT}/flor/`);
  console.log(`💳 Gateway Ativo:       XPay Brasil (PIX Integrado)`);
  console.log(`====================================================`);
});
