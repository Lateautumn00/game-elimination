//归并排序
/**
 * 将两个数组合并排序
 * @param {*} leftArr 左侧数组
 * @param {*} rightArr 右侧数组
 * @returns 
 */
function merge(leftArr,rightArr){
    let newArr=[];//存放新数组
    while(leftArr.length>0 && rightArr.length>0){
        if(leftArr[0]<rightArr[0]){
            newArr.push(leftArr.shift());
        }else{
            newArr.push(rightArr.shift());
        }  
    }
     //console.log([...newArr,...leftArr,...rightArr])
     return newArr.concat(leftArr,rightArr);
}
//拆开
function mergeSort(arr){
    if(arr.length<=1) return arr;
    let middle=parseInt(arr.length/2);//获取中间值,如果数量为奇数舍弃小数部分
    let left=arr.slice(0,middle);//左边
    let right=arr.slice(middle);//右边
    return merge(mergeSort(left),mergeSort(right));//递归分
}

let arr=[50,44,78,1,8,100,101,2,55,43,44];
console.log(mergeSort(arr));//[1,  2,  8, 43,  44, 44, 50, 55, 78, 100, 101]