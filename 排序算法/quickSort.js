// 方法一：借助两个新数组
// function quickSort( arr ) {
//     if(arr.length <= 1) return arr;
//     const num = arr[0];//基准
//     let left = [], right = [];
//     for(let i = 1;i < arr.length; i++) {
//         if(arr[i]<=num) left.push(arr[i]);
//         else right.push(arr[i]);
//     }
//     return quickSort(left).concat([num],quickSort(right));
// }
   
// console.log(quickSort([1, 20, 9, 13, 59, 19, 98]))
// 方法二：通过两侧key
let quickSort = (left, right, arr) => {
      if(left >= right) return arr;
      let val = arr[left]//基准
      let [i, j] = [left, right]//解构
      while (i < j) {
        while (i < j && arr[j] > val) j--
        while (i < j && arr[i] < val) i++
        if (i < j) {
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
      }
      arr[left]=arr[i];
      arr[i] = val//将基准放入其中
      quickSort(left, i - 1, arr)
      quickSort(i + 1, right, arr)
      return arr;
  }
   
 
   
  console.log(quickSort(0 ,11 ,[50,44,78,1,8,100,101,2,55,43,45,10]))