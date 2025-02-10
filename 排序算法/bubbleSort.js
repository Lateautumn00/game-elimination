//冒泡排序
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len-1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {       //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
                //[arr[j],arr[j+1]]=[arr[j+1],arr[j]]
            }
        }
        console.log(i,arr)
    }
    return arr;
}
let arr=[50,44,78,1,8,100,101,2,55,43,44];
console.log(bubbleSort(arr));//[1,  2,  8, 43,  44, 44, 50, 55, 78, 100, 101]