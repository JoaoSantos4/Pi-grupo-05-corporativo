const express = require('express');
const router = express.Router();
const db = require('../db');
const { validarSenha } = require('../utils/hash');

router.get('/', (req, res) => {
  if (req.session.corporativo) return res.redirect('/corporativo');
  res.render('login', { erro: null });
});

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  db.query('SELECT * FROM funcionarios WHERE usuario = ?', [usuario], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.render('login', { erro: 'Usuário ou senha inválidos' });
    }
    const user = results[0];
    const ok = validarSenha(senha, user.senha, user.salt);
    if (!ok) return res.render('login', { erro: 'Usuário ou senha inválidos' });
    req.session.corporativo = user;
    res.redirect('/corporativo');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
