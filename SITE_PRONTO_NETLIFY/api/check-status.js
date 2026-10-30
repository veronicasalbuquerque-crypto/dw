const https = require('https');

const XPAY_API_KEY = process.env.XPAY_API_KEY || 'cpk_live_ex84lopcp2xexagmazz6za11';

module.exports = async function handler(req, res) {
  // Configuração global de CORS para permitir consultas sem bloqueio
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-KEY'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Pega o ID por query param (?id=... ou ?chargeId=...) ou pelo final da URL
  let chargeId = req.query?.id || req.query?.chargeId;
  if (!chargeId && req.url) {
    const segments = req.url.split('?')[0].split('/').filter(Boolean);
    const last = segments[segments.length - 1];
    if (last && last !== 'check-status') {
      chargeId = last;
    }
  }

  if (!chargeId) {
    return res.status(400).json({ success: false, error: 'ID da cobrança não informado' });
  }

  try {
    const xpayRes = await new Promise((resolve, reject) => {
      const request = https.request(`https://api.xpaybrasil.com/v1/charge/${encodeURIComponent(chargeId)}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': XPAY_API_KEY
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
      request.end();
    });

    const parsed = xpayRes.data || {};
    const d = parsed.data || parsed;
    const status = d.paymentStatus || d.status;
    const isPaid = (status === 'PAID' || status === 'COMPLETED' || status === 'CONFIRMED');

    return res.status(xpayRes.statusCode === 200 ? 200 : 400).json({
      success: xpayRes.statusCode === 200,
      chargeId: d.id || chargeId,
      status: status,
      isPaid: isPaid
    });

  } catch (error) {
    console.error('[Vercel check-status error]', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Erro ao consultar status'
    });
  }
};
