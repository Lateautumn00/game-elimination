//桶排序
/**
 * 
 * @param {*} arr 要排序的数组
 * @param {*} barrelNum 桶的元素个数
 */
function barrelSort(arr,barrelNum=10){
    let len=arr.length;
    let max=Math.max.apply(null,arr);
    let min=Math.min.apply(null,arr);
    let arrs=Array.from(new Array(parseInt((max-min)/barrelNum)+1)).map(v=>[]);//生成数组 桶
    //将数据放入对应的桶中
    for(let i=0;i<len;i++){
        arrs[parseInt((arr[i]-min)/barrelNum)].push(arr[i])
    }
    //console.log(arrs)
    let pos=0;//指针
    for(let j=0;j<arrs.length;j++){
        if(arrs[j].length>0){
            //排序
            arrs[j]=insertSort(arrs[j]);
            for(let s=0;s<arrs[j].length;s++){
                arr[pos++]=arrs[j][s];
            }
        }
    }
    return arr;
}
//插入排序
function insertSort(arr){
    let temp,t
    for(let i=1;i<arr.length;i++){
        t=i;
        for(let j=i-1;j>=0;j--){
            if(arr[j]>arr[t]){
                temp=arr[j];
                arr[j]=arr[t];
                arr[t]=temp;
                t=j;
            }else{
                break;
            }
        }
    }
    return arr;
}
let arr=[50,44,78,1,8,100,101,2,55,43,45,1]
console.log(barrelSort(arr,5));//[1,  2,  8, 43,  44,45, 50, 55, 78, 100,101]