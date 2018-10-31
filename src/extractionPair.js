
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
        vicinity:1000,
      },
      {
        id: 'bfdhuyvdz',
        name:'すき家池袋', 
        vicinity:245,
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
        vicinity:50,
      },
      {
        id: 'bfdhuvdfh',
        name:'東京油組総本店 池袋店', 
        vicinity:700,
      }
    ]
  },
];

var nearPair = [];


/**
 * 距離が近いペアをnearPairに格納
 *
 * @param {*} id 処理している店の種類の指定index
 * @param {*} arrNotCurrent 処理している店以外の配列
 */
function extractionNearPair(id, arrNotCurrent) {
  // 末尾より後に行ったら終了
  if (!input[id]) return;

  // 計算の左辺に使用する店の全店舗を回す
  for (var i = 0; i < input[id].data.length; i++) {
    // 計算の左辺に使用する店 ex. サブウェイ新宿店
    const origin = input[id].data[i];

    // 計算の右辺に使用する店種類を回す
    for (var j = 0; j < arrNotCurrent.length; j++) {
      // 計算の右辺に使用する店種類の全店舗を回す
      for (var k = 0; k < arrNotCurrent[j].data.length; k++) {
        // 計算の右辺に使用する店 ex. すき家新宿店
        const target = arrNotCurrent[j].data[k];
        const pairName = [origin.name, target.name];
        const distance = origin.vicinity + target.vicinity;

        const isFar = distance > 500;
        const isDuplicates = nearPair.some(isDuplicatesCheck.bind(pairName));

        // 近くないペアは追加しない
        if(isFar || isDuplicates) continue;

        const pair = {
          name: pairName,
          geometry: [origin.geometry, target.geometry],
          centerPlace: '新宿駅', //ここは別で求める
          distance: distance,
        };

        nearPair.push(pair);
      }
    }
  }
  
  // 次のidへ行き、処理したidのもの以外の配列を引数にして再帰
  const nextNotCurrentArr = input.filter(isNotCurrentIndex.bind(++id));
  extractionNearPair(id, nextNotCurrentArr);
}

// 自分以外の配列を返す idはbindして渡す
function isNotCurrentIndex(facility) {
  const id = Number(this);
  return facility.id !== id;
}

// 重複ペアを検出
function isDuplicatesCheck(pair) {
  const currentPair = this;
  // 比較するときだけソートで順番合わせて重複チェックする
  return pair.name.sort().join() === currentPair.sort().join();
}

var id = 0;
extractionNearPair(id ,input.filter(isNotCurrentIndex.bind(id)));
console.table(nearPair);


