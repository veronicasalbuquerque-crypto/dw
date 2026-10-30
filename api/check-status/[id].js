const handler = require('../check-status');

module.exports = async function (req, res) {
  if (!req.query) req.query = {};
  if (!req.query.id && req.query.id !== undefined) {
    req.query.id = req.query.id;
  }
  return handler(req, res);
};
