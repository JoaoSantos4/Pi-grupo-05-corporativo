const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query(
    'SELECT cod_produto, nome_produto, estoque FROM Produtos ORDER BY nome_produto',
    (err, resultados) => {
      if (err) return res.status(500).send('Erro ao carregar estoque');
      res.render('estoque', { produtos: resultados, user: req.session.corporativo });
    }
  );
});

router.get('/novo', (req, res) => {
  res.render('produto_form', { produto: null, user: req.session.corporativo });
});

router.post('/novo', (req, res) => {
  const { cod_produto, nome_produto, categoria, subcategoria, preco_real, estoque } = req.body;

  db.query('SET @usuario_logado = ?', [req.session.corporativo.usuario], (err) => {
    if (err) console.log('Erro SET usuario_logado:', err);

    db.query(
      `INSERT INTO Produtos 
       (cod_produto, nome_produto, categoria, subcategoria, preco_real, disponibilidade, estoque) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        cod_produto,
        nome_produto,
        categoria,
        subcategoria,
        preco_real || 0,
        'Pronta Entrega',
        estoque || 0
      ],
      (err2) => {
        if (err2) return res.status(500).send('Erro ao adicionar produto');
        res.redirect('/estoque');
      }
    );
  });
});

router.get('/editar/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM Produtos WHERE cod_produto = ?', [id], (err, results) => {
    if (err) return res.status(500).send('Erro ao carregar produto');
    if (!results.length) return res.send('Produto não encontrado');

    res.render('produto_form', { produto: results[0], user: req.session.corporativo });
  });
});

router.post('/editar/:id', (req, res) => {
  const id = req.params.id;
  const { nome_produto, categoria, subcategoria, preco_real, estoque, disponibilidade } = req.body;

  db.query('SET @usuario_logado = ?', [req.session.corporativo.usuario], (err) => {
    if (err) console.log('Erro SET usuario_logado:', err);

    db.query(
      `UPDATE Produtos 
       SET nome_produto=?, categoria=?, subcategoria=?, preco_real=?, estoque=?, disponibilidade=? 
       WHERE cod_produto=?`,
      [
        nome_produto,
        categoria,
        subcategoria,
        preco_real || 0,
        estoque || 0,
        disponibilidade || 'Pronta Entrega',
        id
      ],
      (err2) => {
        if (err2) return res.status(500).send('Erro ao atualizar produto');
        res.redirect('/estoque');
      }
    );
  });
});

router.post('/deletar/:id', (req, res) => {
  const id = req.params.id; 

  db.query('SET @usuario_logado = ?', [req.session.corporativo.usuario], (err) => {
    if (err) console.log('Erro SET usuario_logado:', err);

    db.query('DELETE FROM Produtos WHERE cod_produto = ?', [id], (err2) => {
      if (err2) return res.status(500).send('Erro ao deletar produto');
      res.redirect('/estoque');
    });
  });
});

module.exports = router;
