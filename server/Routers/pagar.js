const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT SUM(total) AS total FROM vendas', (err, results) => {
    if (err) return res.status(500).send('Erro ao calcular total');
    const total = results[0] && results[0].total ? Number(results[0].total) : 0;
    res.render('pagar', { total, user: req.session.corporativo });
  });
});

module.exports = router;
