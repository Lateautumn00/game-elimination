//堆排序
/**
 * 
 * @param {*} arr 
 * @returns 
 */
function heapSort(arr) {
        let len = arr.length,temp;
        //创建一个大顶堆
        for (let i = parseInt(len / 2) - 1; i >= 0; i--) {
            arr=heapify(arr, i, len);
        }
        //堆排序
        for (let j = len - 1; j >= 1; j--) {
            //交换第一个与最后一个位置，这样最大的就在最后
            temp = arr[0];
            arr[0] = arr[j];
            arr[j] = temp;
            arr=heapify(arr, 0, --len);
        }
        return arr;
   
}
/**
 * 维护堆
 * @param {*} arr 
 * @param {*} s 堆的连接点
 * @param {*} len 堆元素数量
 * @returns 
 */
function heapify(arr, s, len) {
        let l = 2 * s + 1, r = 2 * s + 2, largest = s, temp;
        //大顶堆的特点是 x>=x+1 && x>=x+2的元素
        if (l < len && arr[l] >= arr[largest]) {
            largest = l;
        }
        if (r < len && arr[r] >= arr[largest]) {
            largest = r;
        }
        if (largest != s) {
            //将顶点换成最大值
            temp = arr[s];
            arr[s] = arr[largest];
            arr[largest] = temp;
            arr=heapify(arr, largest, len);
        }
        return arr;
}
let arr=[50,44,78,1,8,100,101,2,55,43,45,1];
console.log(heapSort(arr));//[1,   1,  2,  8, 43,44,  45, 50, 55, 78,100, 101]