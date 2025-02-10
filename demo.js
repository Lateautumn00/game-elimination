/*
 * @Description: 
 * @Author: 晚秋
 * @version: 
 * @Date: 2025-01-21 11:50:13
 * @LastEditors: 晚秋
 * @LastEditTime: 2025-02-07 14:01:46
 */
/**
 * @description: Fisher-Yates洗牌算法   100
 * @param {*} array
 * @return {*}
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    // 生成一个0到i之间的随机索引
    const j = Math.floor(Math.random() * (i + 1));
    // 交换元素
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function convertTo2DArray(arr, subArrayLength) {
  let result = [];
  for (let i = 0; i < arr.length; i += subArrayLength) {
    result.push(arr.slice(i, i + subArrayLength));
  }
  return result;
}
const intersection = function (nums1, nums2) {
  // 创建一个 Set 类型的变量 setNum1，并将 nums1 数组的元素添加进去
  // Set 类型可以自动去除数组中的重复元素
  let setNum1 = new Set(nums1);

  // 创建一个空的 Set 类型的变量 setRes，用于存储最终的交集结果
  let setRes = new Set();

  // 使用 for...of 循环遍历 nums2 数组中的每个元素
  for (let i of nums2) {
    // 对于 nums2 中的每个元素 i，检查它是否存在于 setNum1 中
    if (setNum1.has(i)) {
      // 如果存在，说明 i 是 nums1 和 nums2 的共同元素
      // 将其添加到 setRes 中，作为交集结果的一部分
      setRes.add(i);
    }
  }

  // 使用 Array.from 方法将 setRes 转换为数组并返回
  return Array.from(setRes);
};


const arr = Array.from({ length: 9 }, () => {
  return Array.from({ length: 9 }, (_, i) => i + 1)
})

const getData = (n, noData, noData1 = []) => {
  //console.log(noData, noData1)
  let currentData = Array.from({ length: 9 }, (_, i) => i + 1)
  let data = []//方块内不能取得
  for (let i = 0; i < n; i++) {
    const dataNo = n === 9 ? [...noData[(i / 3) | 0], ...noData1[i % 3]] : noData[i]
    data.push(...shuffleArray(currentData.filter(item => !Array.from(new Set([...dataNo, ...data])).includes(item))).slice(0, 9 / n))
    if (i === n - 1) {
      const m = currentData.filter((item, index) => !data.includes(item))
      if (m.length) {
        for (let j = 0; j < m.length; j++) {
          let s = 0
          let d = data[s]
          while (dataNo.includes(d)) {
            s += 1
            d = data[s]
          }
          data.splice(s, 1, m[j])
          data.push(d)
        }
      }
      return data
    }
  }
}
arr[0] = convertTo2DArray(getData(3, [[], [], []]), 3)
console.log('第0各块', arr[0])
arr[1] = convertTo2DArray(getData(3, arr[0]), 3)
console.log('第1各块', arr[1])
arr[2] = convertTo2DArray(getData(3, [
  [...arr[0][0], ...arr[1][0]],
  [...arr[0][1], ...arr[1][1]],
  [...arr[0][2], ...arr[1][2]]
]), 3)
console.log('第2各块', arr[2])
arr[3] = convertTo2DArray(getData(9, [[], [], []], [
  [arr[0][0][0], arr[0][1][0], arr[0][2][0]],
  [arr[0][0][1], arr[0][1][1], arr[0][2][1]],
  [arr[0][0][2], arr[0][1][2], arr[0][2][2]]
]), 3)
console.log('第3各块', arr[3])

arr[4] = convertTo2DArray(getData(9, arr[3], [
  [arr[1][0][0], arr[1][1][0], arr[1][2][0]],
  [arr[1][0][1], arr[1][1][1], arr[1][2][1]],
  [arr[1][0][2], arr[1][1][2], arr[1][2][2]]
]), 3)
console.log('第4各块', arr[4])

arr[5] = convertTo2DArray(getData(9, [
  [...arr[3][0], ...arr[4][0]],
  [...arr[3][1], ...arr[4][1]],
  [...arr[3][2], ...arr[4][2]]
], [
  [arr[2][0][0], arr[2][1][0], arr[2][2][0]],
  [arr[2][0][1], arr[2][1][1], arr[2][2][1]],
  [arr[2][0][2], arr[2][1][2], arr[2][2][2]]
]), 3)
console.log('第5各块', arr[5])

arr[6] = convertTo2DArray(getData(9, [
  [],
  [],
  []
], [
  [arr[0][0][0], arr[0][1][0], arr[0][2][0], arr[3][0][0], arr[3][1][0], arr[3][2][0]],
  [arr[0][0][1], arr[0][1][1], arr[0][2][1], arr[3][0][1], arr[3][1][1], arr[3][2][1]],
  [arr[0][0][2], arr[0][1][2], arr[0][2][2], arr[3][0][2], arr[3][1][2], arr[3][2][2]]
]), 3)
console.log('第6各块', arr[6])

arr[7] = convertTo2DArray(getData(9, arr[6], [
  [arr[1][0][0], arr[1][1][0], arr[1][2][0], arr[4][0][0], arr[4][1][0], arr[4][2][0]],
  [arr[1][0][1], arr[1][1][1], arr[1][2][1], arr[4][0][1], arr[4][1][1], arr[4][2][1]],
  [arr[1][0][2], arr[1][1][2], arr[1][2][2], arr[4][0][2], arr[4][1][2], arr[4][2][2]]
]), 3)
console.log('第7各块', arr[7])

arr[8] = convertTo2DArray(getData(9, [
  [...arr[6][0], ...arr[7][0]],
  [...arr[6][1], ...arr[7][1]],
  [...arr[6][2], ...arr[7][2]]
], [
  [arr[2][0][0], arr[2][1][0], arr[2][2][0], arr[5][0][0], arr[5][1][0], arr[5][2][0]],
  [arr[2][0][1], arr[2][1][1], arr[2][2][1], arr[5][0][1], arr[5][1][1], arr[5][2][1]],
  [arr[2][0][2], arr[2][1][2], arr[2][2][2], arr[5][0][2], arr[5][1][2], arr[5][2][2]]
]), 3)
console.log('第8各块', arr[8])
