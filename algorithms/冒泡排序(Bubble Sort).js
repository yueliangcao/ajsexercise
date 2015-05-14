//tests
function test_1(){
  var arr = [];
  for(var i=0; i<1000; i++){
    arr.push(Math.floor(Math.random()*10000));
  }
  console.time('t');
  var arr1 = bubbleSort(arr);
  console.timeEnd('t');
  console.log(arr1);
}

//从左向右，上浮
function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                arr[i] += arr[j];
                arr[j] = arr[i] - arr[j];
                arr[i] -= arr[j];
            }
        }
    }

    return arr;
}