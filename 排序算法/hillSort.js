
function hillSort(arr){
    let len = arr.length;
    for (let fraction = Math.floor(len / 2); fraction > 0; fraction = Math.floor(fraction / 2)) {
        //折半  获取每次的间隔值
        for (let i = fraction; i <= len; i += fraction) {
            //通过间隔值获取分组
            for (let j = i - fraction; j >= 0 && arr[j] > arr[fraction + j]; j -= fraction) {
                //此步骤为了 最后一个与前面的一一比较
                let temp = arr[j];
                arr[j] = arr[fraction + j];
                arr[fraction + j] = temp;
            }
        }
    }
    //console.log(arr);
    return arr;
}

let arr=[50,44,78,1,8,100,101,2,55,43,45]
console.log(hillSort(arr));//[1,  2,  8, 43,  44,45, 50, 55, 78, 100,101]