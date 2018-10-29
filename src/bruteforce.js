
const input = [
  {type:'sukiya',name:'a', distance:{}}, 
  {type:'subway',name:'b', distance:{}}, 
  {type:'sutaba',name:'c', distance:{}},
  {type:'takasi',name:'d', distance:{}}
];

// 総当たり(重複なし)
// 引数なしの場合0からスタート
function bruteforce(n = 0){
  // 末尾まで行ったら再帰終了
  if(input[n] == undefined) return;

  for(var i = n; i <= input.length; i++){
    // 参照する先がない場合終了
    if(!input[i]) break;
    // 自分自身は処理しない
    if(input[n].name === input[i].name) continue;
    
    const res = input[n].name + input[i].name;
    const resReverse = input[i].name + input[n].name;
    
    input[n].distance[input[i].type] = res;
    input[i].distance[input[n].type] = resReverse;
  }
  console.log(input[n].type);
  console.log(input[n].distance);
  bruteforce(n + 1);
}

bruteforce();
