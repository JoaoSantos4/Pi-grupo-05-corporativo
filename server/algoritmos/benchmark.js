const alg = require('./index');

function randomArray(n){
  const arr = [];
  for (let i=0;i<n;i++){
    arr.push({ id: i, nome_produto: 'produto ' + Math.random().toString(36).slice(2,8) });
  }
  return arr;
}

function timeFunction(fn, arg){
  const t0 = process.hrtime();
  fn(arg);
  const diff = process.hrtime(t0);
  return diff[0]*1000 + diff[1]/1e6;
}

function runBenchmark(n){
  const sample = randomArray(n);
  const copy1 = sample.slice();
  const copy2 = sample.slice();
  const times = {
    n,
    bubble: timeFunction(() => alg.bubbleSort(copy1, 'nome_produto'), copy1),
    selection: timeFunction(() => alg.selectionSort(copy2, 'nome_produto'), copy2),
    quick: timeFunction(() => alg.quickSort(sample.slice(), 'nome_produto'), sample)
  };
  return times;
}

module.exports = { runBenchmark };
