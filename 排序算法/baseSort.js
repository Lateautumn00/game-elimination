//基数排序
function baseSort(arr){
    if(arr.length<=1) return arr;
    let max=Math.max.apply(null,arr);//获取最大值
    let n=max.toString().length;//最大值是几位
    let arrs=Array.from(new Array(10)).map(v=>[])//创建二维数组
    let mod = 10;
    let dev = 1;
    for(let i=0;i<n;i++,mod*=10,dev*=10){
        for(let j=0;j<arr.length;j++){
            let d = parseInt((arr[j] % mod) / dev);
            arrs[d].push(arr[j])
        }
        let s = 0;//指针
        for(let m=0;m<arrs.length;m++){
            let value = null;
　　　　　　 if(arrs[m].length) {
　　　　　　　　while (value = arrs[m].shift()) {
　　　　　　　　　　arr[s++] = value;
　　　　　　　　}
　　　　　　}
// if(m===0) arr=[];
// arr=[...arr,...arrs[m]];
// arrs[m]=[];
        }
    }
    return arr;
}
let arr=[50,44,78,1,8,100,101,2,55,43,45]
console.log(baseSort(arr));//[1,  2,  8, 43,  44,45, 50, 55, 78, 100,101]