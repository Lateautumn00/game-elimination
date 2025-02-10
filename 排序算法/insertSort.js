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
console.log(insertSort([1,3,1,2]))//[1,  9, 13, 19,20, 59, 98]