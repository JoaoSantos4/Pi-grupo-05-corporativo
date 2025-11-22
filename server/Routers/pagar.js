  const express = require('express');
  const router = express.Router();
  const db = require('../db');

  router.get('/', (req, res) => {

    db.query(
      'SELECT IFNULL(SUM(total),0) AS totalFaturado FROM vendas',
      (err1, r1) => {
        if (err1) return res.status(500).send("Erro total faturado");

        const totalFaturado = Number(r1[0].totalFaturado) || 0;

        db.query(
          `SELECT nome_cliente, email, SUM(total) AS gasto
          FROM vendas
          GROUP BY email, nome_cliente
          ORDER BY gasto DESC
          LIMIT 10`,
          (err2, clientes) => {
            if (err2) return res.status(500).send("Erro clientes");

            db.query(
              `SELECT p.cod_produto, p.nome_produto,
                      p.preco_real, p.preco_custo,
                      SUM(iv.quantidade) AS qtd_vendida,
                      SUM(iv.quantidade * iv.preco_unitario) AS receita
              FROM itens_venda iv
              JOIN Produtos p ON p.cod_produto = iv.produto_id
              GROUP BY iv.produto_id
              ORDER BY qtd_vendida DESC
              LIMIT 10`,
              (err3, r3) => {
                if (err3) {
                  console.log(err3);
                  return res.status(500).send("Erro produtos");
                }

                const produtos = r3.map(row => {
                  const receita = Number(row.receita || 0);
                  const qtd = Number(row.qtd_vendida || 0);
                  const custo = Number(row.preco_custo || 0);

                  return {
                    cod: row.cod_produto,
                    nome: row.nome_produto,
                    qtd_vendida: qtd,
                    receita,
                    custo,
                    lucro: receita - (qtd * custo)
                  };
                });

                res.render("pagar", {
                  total: totalFaturado,
                  produtos,
                  clientes
                });

              }
            );
          }
        );
      }
    );
  });

  module.exports = router;
