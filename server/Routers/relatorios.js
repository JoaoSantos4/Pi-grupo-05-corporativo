const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM logs_produtos ORDER BY data DESC LIMIT 500', (err, results) => {
    if (err) return res.status(500).send('Erro ao carregar relatórios');
    res.render('relatorios', { logs: results, user: req.session.corporativo });
  });
});

module.exports = router;
