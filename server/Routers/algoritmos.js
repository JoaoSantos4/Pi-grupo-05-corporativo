const express = require('express');
const router = express.Router();
const db = require('../db');
const alg = require('../algoritmos'); 
const bench = require('../algoritmos/benchmark');

router.get('/', (req, res) => {
  res.render('algoritmos_index', {
    titulo: 'Algoritmos - Integração ED',
    descricao: 'Busca sequencial, busca binária, ordenação e benchmark.'
  });
});

router.get('/busca-sequencial', (req, res) => {
  const termo = (req.query.termo || '').toLowerCase();

  db.query('SELECT cod_produto, nome_produto FROM Produtos', (err, rows) => {
    if (err) return res.status(500).send('Erro DB: ' + err.message);

    const arr = rows.map(r => ({ cod: r.cod_produto, nome: r.nome_produto.toLowerCase() }));

    const t0 = process.hrtime();
    const result = alg.buscaSequencial(arr, termo, 'nome');
    const diff = process.hrtime(t0);
    const ms = diff[0]*1000 + diff[1]/1e6;

    res.render('algoritmos_result', {
      tipo: 'Busca Sequencial',
      termo,
      resultado: result,
      tempo: ms,
      sample: arr.slice(0, 10)
    });
  });
});

router.get('/busca-binaria', (req, res) => {
  const termo = (req.query.termo || '').toLowerCase();

  db.query('SELECT cod_produto, nome_produto FROM Produtos', (err, rows) => {
    if (err) return res.status(500).send('Erro DB: ' + err.message);

    const arr = rows.map(r => ({
      cod: r.cod_produto,
      nome: r.nome_produto.toLowerCase()
    }));

    arr.sort((a, b) => a.nome.localeCompare(b.nome));

    const t0 = process.hrtime();
    const result = alg.buscaBinaria(arr, termo, 'nome');
    const diff = process.hrtime(t0);
    const ms = diff[0]*1000 + diff[1]/1e6;

    res.render('algoritmos_result', {
      tipo: 'Busca Binária',
      termo,
      resultado: result,
      tempo: ms,
      sample: arr.slice(0, 10)
    });
  });
});

router.get('/ordenar', (req, res) => {
  const algName = (req.query.alg || 'quick').toLowerCase();

  db.query('SELECT cod_produto, nome_produto FROM Produtos', (err, rows) => {
    if (err) return res.status(500).send('Erro DB: ' + err.message);

    const arr = rows.map(r => ({
      cod: r.cod_produto,
      nome: r.nome_produto.toLowerCase()
    }));

    const t0 = process.hrtime();

    let result;
    if (algName === 'bubble') {
      result = alg.bubbleSort(arr.slice(), 'nome');
    } else if (algName === 'selection') {
      result = alg.selectionSort(arr.slice(), 'nome');
    } else {
      result = alg.quickSort(arr.slice(), 'nome'); 
    }

    const diff = process.hrtime(t0);
    const ms = diff[0]*1000 + diff[1]/1e6;

    const arrayFinal = result.array || result;

    res.render('algoritmos_result', {
      tipo: 'Ordenação',
      termo: algName,
      resultado: result,
      tempo: ms,
      sample: arrayFinal.slice(0, 8)
    });
  });
});

router.get('/benchmark', (req, res) => {
  const n = parseInt(req.query.n) || 5000;
  const data = bench.runBenchmark(n);
  res.render('algoritmos_benchmark', { data });
});

module.exports = router;
