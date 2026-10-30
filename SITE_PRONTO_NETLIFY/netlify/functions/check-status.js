const https = require('https');

const XPAY_API_KEY = process.env.XPAY_API_KEY || 'cpk_live_ex84lopcp2xexagmazz6za11';

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Pega o ID da query string (?id=...) ou do path
  const chargeId = event.queryStringParameters?.id || event.path.split('/').pop();

  if (!chargeId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'ID da cobrança não informado' })
    };
  }

  return await new Promise((resolve) => {
    const req = https.request(`https://api.xpaybrasil.com/v1/charge/${encodeURIComponent(chargeId)}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': XPAY_API_KEY
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const d = parsed.data || parsed;
          const status = d.paymentStatus || d.status;
          const isPaid = (status === 'PAID' || status === 'COMPLETED' || status === 'CONFIRMED');

          resolve({
            statusCode: res.statusCode,
            headers,
            body: JSON.stringify({
              success: res.statusCode === 200,
              chargeId: d.id,
              status: status,
              isPaid: isPaid
            })
          });
        } catch (e) {
          resolve({
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false, error: 'Erro ao analisar status' })
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

    req.end();
  });
};
