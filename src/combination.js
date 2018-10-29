// 組み合わせ総数
function combination(n, r){
  if(r == 0) return 1;
  return  (n - r + 1) * combination(n, r - 1) / r;
}
// 6
console.log(combination(4, 2));
