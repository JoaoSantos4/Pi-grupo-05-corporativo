const express = require('express');
const router = express.Router();
const db = require('../db');

// ROTA: Página de Relatórios / Logs
router.get('/', (req, res) => {
  db.query(
    `
      SELECT 
        lp.*, 
        p.nome_produto 
      FROM logs_produtos lp
      LEFT JOIN Produtos p 
        ON p.cod_produto = lp.produto_id
      ORDER BY lp.data DESC
      LIMIT 500
    `,
    (err, resultados) => {
      if (err) {
        console.error("ERRO ao carregar logs:", err);
        return res.status(500).send("Erro ao carregar relatórios");
      }

      res.render("relatorios", {
        logs: resultados,
        user: req.session.corporativo
      });
    }
  );
});

module.exports = router;
