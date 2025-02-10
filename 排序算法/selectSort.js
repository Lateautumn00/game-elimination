//选择排序
function selectSort(arr) {
    let len = arr.length;
    let minIndex, temp;
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
let arr=[50,44,78,1,8,100,101,2,55,43,44];
console.log(selectSort(arr));//[1,  2,  8, 43,  44, 44, 50, 55, 78, 100, 101]