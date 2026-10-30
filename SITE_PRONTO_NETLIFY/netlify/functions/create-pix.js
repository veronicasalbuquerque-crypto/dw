const https = require('https');

const XPAY_API_KEY = process.env.XPAY_API_KEY || 'cpk_live_ex84lopcp2xexagmazz6za11';

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
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
        email: customer?.email ? customer.email.trim() : `cliente_${cleanCpf.slice(-4)}@bellaaurora.com.br`,
        phone: cleanPhone || '11999999999',
        postalCode: cleanCep || '01001000',
        address: (customer?.address || 'Rua Principal').trim(),
        number: (customer?.number || 'S/N').trim(),
        district: (customer?.district || 'Centro').trim(),
        line1: (customer?.line1 || '').trim()
      }
    });

    return await new Promise((resolve) => {
      const req = https.request('https://api.xpaybrasil.com/v1/charge/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': XPAY_API_KEY,
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const charge = parsed.data || parsed;
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve({
                statusCode: 200,
                headers,
                body: JSON.stringify({
                  success: true,
                  chargeId: charge.id,
                  brCode: charge.brCode,
                  brCodeBase64: charge.brCodeBase64,
                  url: charge.url,
                  amount: charge.amount
                })
              });
            } else {
              const err = parsed.errors?.[0]?.description || parsed.message || 'Erro ao gerar PIX';
              resolve({
                statusCode: res.statusCode || 400,
                headers,
                body: JSON.stringify({ success: false, error: err })
              });
            }
          } catch (e) {
            resolve({
              statusCode: 500,
              headers,
              body: JSON.stringify({ success: false, error: 'Resposta inválida do gateway' })
            });
          }
        });
      });

      req.on('error', (err) => {
        resolve({
          statusCode: 500,
          headers,
          body: JSON.stringify({ success: false, error: err.message })
        });
      });

      req.write(payload);
      req.end();
    });
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
