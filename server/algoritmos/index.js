function comparaCampo(a,b,field){
  const va = (a[field] || '').toString().toLowerCase();
  const vb = (b[field] || '').toString().toLowerCase();
  if (va < vb) return -1;
  if (va > vb) return 1;
  return 0;
}

function buscaSequencial(array, termo, campo){
  if (!termo) return null;
  for (let i=0;i<array.length;i++){
    if ((array[i][campo]||'').toLowerCase().includes(termo)) return { index: i, item: array[i] };
  }
  return null;
}

function buscaBinaria(array, termo, campo){
  if (!termo) return null;
  let lo = 0, hi = array.length-1;
  while (lo <= hi){
    const mid = Math.floor((lo+hi)/2);
    const val = (array[mid][campo]||'').toLowerCase();
    if (val === termo) return { index: mid, item: array[mid] };
    if (val < termo) lo = mid + 1;
    else hi = mid - 1;
  }
  return null;
}

function selectionSort(array, campo){
  let comps = 0, swaps = 0;
  for (let i=0;i<array.length-1;i++){
    let min = i;
    for (let j=i+1;j<array.length;j++){
      comps++;
      if (comparaCampo(array[j], array[min], campo) < 0) min = j;
    }
    if (min !== i){ swaps++; [array[i], array[min]] = [array[min], array[i]]; }
  }
  return { array, comps, swaps };
}

function bubbleSort(array, campo){
  let comps = 0, swaps = 0;
  for (let i=0;i<array.length;i++){
    for (let j=0;j<array.length-1-i;j++){
      comps++;
      if (comparaCampo(array[j+1], array[j], campo) < 0){
        swaps++; [array[j], array[j+1]] = [array[j+1], array[j]];
      }
    }
  }
  return { array, comps, swaps };
}

function quickSort(array, campo){
  if (array.length <= 1) return array;
  const pivot = array[Math.floor(array.length/2)];
  const left = [], right = [], equal = [];
  for (const item of array){
    const cmp = comparaCampo(item, pivot, campo);
    if (cmp < 0) left.push(item);
    else if (cmp > 0) right.push(item);
    else equal.push(item);
  }
  return quickSort(left, campo).concat(equal, quickSort(right, campo));
}

module.exports = {
  buscaSequencial,
  buscaBinaria,
  selectionSort,
  bubbleSort,
  quickSort
};
