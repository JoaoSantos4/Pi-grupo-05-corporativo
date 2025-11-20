const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query(`SELECT v.id, v.nome_cliente, v.email, v.data_venda, iv.produto_id, iv.quantidade
            FROM vendas v
            JOIN itens_venda iv ON iv.venda_id = v.id
            WHERE v.id IS NOT NULL
            ORDER BY v.data_venda DESC
            LIMIT 200`, (err, results) => {
    if (err) return res.status(500).send('Erro expedição');
    res.render('expedicao', { dados: results, user: req.session.corporativo });
  });
});

module.exports = router;
