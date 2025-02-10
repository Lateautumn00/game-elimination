//计数排序
function countSort(arr){
    let len=arr.length;
    let max=Math.max.apply(null,arr);//最大值
    //let min=Math.min.apply(null,arr);//最小值
    let arrs=Array.from(new Array(max+1)).map(v=>0)//生成一个含有max元素的数组
    for(let i=0;i<len;i++){
        arrs[arr[i]]++
    }
    let pos=0;//指针
    for(let j=0;j<arrs.length;j++){
        while(arrs[j]>0){
            arr[pos++]=j
            arrs[j]--;
        }
    }
    return arr;
}
let arr=[50,44,78,1,8,100,101,2,55,43,45,1]
console.log(countSort(arr));//[1,  2,  8, 43,  44,45, 50, 55, 78, 100,101]