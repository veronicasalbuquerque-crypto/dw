const https = require('https');

const XPAY_API_KEY = process.env.XPAY_API_KEY || 'cpk_live_ex84lopcp2xexagmazz6za11';

module.exports = async function handler(req, res) {
  // Configuração global de CORS para evitar qualquer bloqueio no navegador
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-KEY'
  );

  // Responde imediatamente a requisições de preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido. Use POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    body = body || {};

    const { amount, customer, externalId } = body;

    const cleanCpf = String(customer?.taxId || '').replace(/\D/g, '');
    const cleanPhone = String(customer?.phone || '').replace(/\D/g, '');
    const cleanCep = String(customer?.postalCode || '').replace(/\D/g, '');

    const payload = JSON.stringify({
      amount: Math.round(Number(amount) || 0),
      expiresIn: 1800,
      externalId: externalId || `pedido_${Date.now()}`,
      customer: {
        taxId: cleanCpf,
        name: (customer?.name || '').trim(),
        email: customer?.email ? customer.email.trim() : `cliente_${cleanCpf.slice(-4) || 'pix'}@bellaaurora.com.br`,
        phone: cleanPhone || '11999999999',
        postalCode: cleanCep || '01001000',
        address: (customer?.address || 'Rua Principal').trim(),
        number: (customer?.number || 'S/N').trim(),
        district: (customer?.district || 'Centro').trim(),
        line1: (customer?.line1 || '').trim()
      }
    });

    const xpayRes = await new Promise((resolve, reject) => {
      const request = https.request('https://api.xpaybrasil.com/v1/charge/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': XPAY_API_KEY,
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (response) => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
          try {
            resolve({ statusCode: response.statusCode, data: JSON.parse(data) });
          } catch (err) {
            resolve({ statusCode: response.statusCode, data });
          }
        });
      });

      request.on('error', reject);
      request.write(payload);
      request.end();
    });

    if (xpayRes.statusCode >= 200 && xpayRes.statusCode < 300) {
      const charge = xpayRes.data?.data || xpayRes.data;
      return res.status(200).json({
        success: true,
        chargeId: charge.id,
        brCode: charge.brCode,
        brCodeBase64: charge.brCodeBase64,
        url: charge.url,
        amount: charge.amount
      });
    } else {
      const errMsg = xpayRes.data?.errors?.[0]?.description || xpayRes.data?.message || 'Erro ao gerar PIX no gateway.';
      return res.status(xpayRes.statusCode || 400).json({
        success: false,
        error: errMsg
      });
    }

  } catch (error) {
    console.error('[Vercel create-pix error]', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Erro interno no servidor'
    });
  }
};
