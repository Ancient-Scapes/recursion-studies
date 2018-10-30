
const input = [
  {
    id: 0,
    name:'サブウェイ', 
    data:[
      {
        id: 'vzyhvbsy',
        name:'サブウェイ新宿', 
        vicinity:111,
      },
      {
        id: 'vzsgbvysdzgy',
        name:'サブウェイ池袋', 
        vicinity:222,
      }
    ]
  },
  {
    id: 1,
    name:'すき家', 
    data:[
      {
        id: 'vdsftvdsz',
        name:'すき家新宿', 
        vicinity:1,
      },
      {
        id: 'bfdhuyvdz',
        name:'すき家池袋', 
        vicinity:2,
      }
    ]
  },
  {
    id: 2,
    name:'東京油組総本店', 
    data:[
      {
        id: 'gsjigdjfds',
        name:'東京油組総本店 渋谷店', 
        vicinity:1,
      },
      {
        id: 'bfdhuvdfh',
        name:'東京油組総本店 池袋店', 
        vicinity:2,
      }
    ]
  },
];

var distance = [];


/**
 * inputをループさせてdistanceに店の種類ごとに配列を分け計算結果を格納
 *
 * @param {*} id 処理している店の種類の指定index
 * @param {*} arr 処理している店以外の配列
 */
function bruteforce(id, arr) {
  // 末尾より後に行ったら終了
  if (!input[id]) return;
  // 店の種別ごとの配列 ex.サブウェイ
  var res = [];

  // 計算の左辺に使用する店の全店舗を回す
  for (let i = 0; i < input[id].data.length; i++) {
    // 計算の左辺に使用する店 ex. サブウェイ新宿店
    const origin = input[id].data[i];
    // 店ごとの距離計算結果 ex. サブウェイ新宿店の計算結果
    var eachRes = {
      name: origin.name,
      distance: {},
    };
    // 計算の右辺に使用する店種類を回す
    for (let j = 0; j < arr.length; j++) {
      // 計算の右辺に使用する店種類の全店舗を回す
      for (let k = 0; k < arr[j].data.length; k++) {
        // 計算の右辺に使用する店 ex. すき家新宿店
        const target = arr[j].data[k];

        // 右辺の店との距離計算結果 ex. すき家新宿店
        const distanceResult = {
          name: target.name,
          // ↓実際には他の方法で計算するが、あとはどうにでもなるのでとりあえず適当に足し算しとく
          distance: origin.vicinity + target.vicinity
        };
        // idで店を指定できるようにkeyにする
        // 本当は店の種類ごとにArrayにしたいが自身の店とは比較しないのでずれてしまう
        // 自身と比較すれば店の種類ごとにArray作ってもあり
        eachRes.distance[target.id] = distanceResult;
      }
    }
    // 店ごとの計算結果を入れる ex.サブウェイ新宿店の距離計算結果
    res.push(eachRes);
  }
  // 店の種類が終わったら ex. サブウェイの距離計算結果全て
  distance.push(res);
  
  // 次のidへ行き、処理したidのもの以外の配列を引数にして再帰
  const nextArray = input.filter(notCurrentIndex.bind(++id));
  bruteforce(id, nextArray);
}

// 自分以外の配列を返す idはbindして渡す
function notCurrentIndex(facility) {
  const id = Number(this);
  return facility.id !== id;
}

var id = 0;
bruteforce(id ,input.filter(notCurrentIndex.bind(id)));
// 全階層表示
console.log(JSON.stringify(distance, null, '  '));

