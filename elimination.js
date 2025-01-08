/*
 * @Description: 操作类
 * @Author: 晚秋
 * @version: 
 * @Date: 2025-01-01 17:28:06
 * @LastEditors: 晚秋
 * @LastEditTime: 2025-01-08 12:43:25
 */

//10 * 14= 140
// {
//     '信封': 1,
//     '水桶': 2,
//     '豌豆角': 3,
//     '帽子': 4,
//     '草': 5,
//     '西红柿': 6,
//     '雪团': 7,
//     '靴子': 8,
//     '毛线': 9,
//     '火': 10,
//     '白菜': 11,
//     '房子': 12,
//     '辣椒': 13,
//     '绳子': 14,
//     '南瓜': 15,
//     '草捆': 16,
//     '木桶': 17,
//     '圆白菜': 18,
//     '草篮': 19,
//     '斧头': 20,
//     '西兰花': 21,
//     '鸡腿': 22,
//     '刷子': 23,
//     '铃铛': 24,
//     '铁锹': 25,
//     '烤肠': 26,
//     '茄子': 27,
//     '洒水壶': 28,
//     '白栅栏': 29,
//     '奶瓶': 30,
//     '玉米': 31,
//     '剪刀': 32,
//     '胡萝卜': 33,
//     '叉子': 34,
//     '木墩': 35,
//     '手套': 36
//   }

//位置为空    位置内容置为0

// Fisher-Yates洗牌算法
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 生成一个0到i之间的随机索引
    const j = Math.floor(Math.random() * (i + 1));
    // 交换元素
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//生成
/**
 * 
 * @param {*} num 多少种类块
 * @param {*} chunkSize    多少列
 */

class Elimination {
  num = 36;  //多少种类块
  chunkSize = 10;//每行多少块
  twoDimensionalArr = [];//初始化生成的二维数组
  clickIndexData = []//当前点击的点
  indexData = {
    click: [],
    left: [],
    right: [],
    up: [],
    down: []
  }//当前点 前后左右四个方向对应非0值的坐标
  move = ''//移动方向
  directionArr = Object.keys(this.indexData)// ['click', 'left', 'right', 'up', 'down']
  moveData = []//当前移动块s
  removeData = []
  //moveDirStatus = false//移动方向是否变化
  constructor(num = 36, chunkSize = 10) {
    this.num = num;
    this.chunkSize = chunkSize;
    this.init();//初始化
  }
  //初始化
  init() {
    let arr = Array.from({ length: this.num }, (_, i) => i + 1);// 创建一个包含1到36的数组
    arr = shuffleArray(arr);// 打乱数组
    arr = arr.flatMap((item, index) => Array(index < 3 ? 6 : index < 8 ? 2 : 4).fill(item));// 根据条件重复元素
    arr = shuffleArray(arr);//再次打乱
    // 将一维数组分成二维数组，每组n个元素
    let arr2 = []
    while (arr.length > 0) {
      arr2.push(arr.splice(0, this.chunkSize))
    }
    this.twoDimensionalArr = arr2
    //console.log(this.twoDimensionalArr)
    //return this.twoDimensionalArr;
    this.twoDimensionalArr = [
      [13, 20, 9, 35, 24, 0, 24, 29, 30, 23],
      [29, 20, 17, 21, 1, 30, 16, 14, 21, 6],
      [36, 24, 18, 19, 13, 0, 30, 28, 26, 12],
      [18, 3, 1, 10, 19, 30, 27, 4, 24, 30],
      [28, 29, 31, 2, 34, 0, 19, 36, 6, 26],
      [1, 17, 13, 23, 3, 0, 9, 27, 2, 13],
      [36, 7, 19, 28, 7, 0, 7, 25, 25, 21],
      [5, 33, 0, 10, 11, 0, 30, 32, 31, 20],
      [34, 27, 11, 22, 7, 0, 23, 28, 5, 17],
      [12, 16, 12, 5, 15, 0, 15, 20, 26, 35],
      [16, 24, 24, 24, 21, 0, 34, 33, 29, 27],
      [5, 17, 32, 25, 31, 0, 29, 25, 11, 26],
      [23, 2, 8, 16, 14, 0, 22, 1, 36, 32],
      [32, 6, 31, 8, 11, 0, 19, 22, 35, 4]
    ]
  }
  getClickIndexData() {
    return this.clickIndexData
  }
  //获取当前点击的坐标
  removeClickIndexData() {
    return this.clickIndexData = []
  }
  //暴漏directionArr
  getDirectionArr() {
    return this.directionArr
  }
  /**
   * 设置当前点击的坐标  位置从0开始
   */
  setIndex(indexArr) {
    if (indexArr[0] < 0 || indexArr[0] > this.twoDimensionalArr.length) {
      throw new Error("行超出范围")
    }
    if (indexArr[1] < 0 || indexArr[1] > this.chunkSize) {
      throw new Error("列超出范围")
    }
    this.clickIndexData = [...indexArr]

  }

  /**
   * 洗牌 随机打乱当前已存在的二维数组
   * @returns 
   */
  updataShuffle() {
    let arr = shuffleArray(this.twoDimensionalArr.flat())
    let arr2 = []
    while (arr.length > 0) {
      arr2.push(arr.splice(0, this.chunkSize))
    }
    this.twoDimensionalArr = arr2
    //console.log(this.twoDimensionalArr)
  }
  //设置某个位置的数据
  setElementNode(indexArr, value) {
    this.twoDimensionalArr[indexArr[0]][indexArr[1]] = value;
    this.twoDimensionalArr = [...this.twoDimensionalArr]
  }
  //获取点的数据
  getElementNode(indexArr) {
    if (indexArr[0] < 0 || indexArr[0] >= this.twoDimensionalArr.length) return -1;
    if (indexArr[1] < 0 || indexArr[1] >= this.chunkSize) return -1;
    //console.log(123, indexArr, rowData)
    return this.twoDimensionalArr[indexArr[0]][indexArr[1]];
  }
  //设置当前点 并获取前后左右元素坐标
  setIndexData(indexArr) {
    if (indexArr.length !== 2) throw new Error("参数错误")
    this.indexData.click = [...indexArr]//设置当前点击的坐标
    this.indexData.left = [...indexArr]//初始化对应的left
    this.indexData.right = [...indexArr]//初始化对应的right
    this.indexData.up = [...indexArr]//初始化对应的up
    this.indexData.down = [...indexArr]//初始化对应的down
    this.getRowDatas()//更新对应的left right  0 跳过
    this.getColDatas()//更新对应的up down  0 跳过
  }
  //获取当前点四个方向可消除的坐标点
  isrRemove() {
    if (this.removeData.length > 0) return this.removeData
    let arr = []
    if (this.getElementNode(this.indexData.left) === this.getElementNode(this.indexData.click)) {
      arr.push(this.indexData.left)
    }
    if (this.getElementNode(this.indexData.right) === this.getElementNode(this.indexData.click)) {
      arr.push(this.indexData.right)
    }
    if (this.getElementNode(this.indexData.up) === this.getElementNode(this.indexData.click)) {
      arr.push(this.indexData.up)
    }
    if (this.getElementNode(this.indexData.down) === this.getElementNode(this.indexData.click)) {
      arr.push(this.indexData.down)
    }
    this.removeData = arr
    return arr
  }
  clearIsRemove() {
    this.removeData = []
  }
  //获取当前点击元素的周围值
  getIndexData() {
    return this.indexData
  }
  //清空当前点击元素周围值
  clearIndexData() {
    this.indexData = {
      click: [],
      left: [],
      right: [],
      up: [],
      down: []
    }
  }
  /**
   * 更新click 对应的left right
   */
  getRowDatas() {
    //向左移动指针
    do {
      this.indexData.left[1] -= 1
    } while (this.indexData.left[1] >= 0 && this.getElementNode(this.indexData.left) === 0)
    //向右移动指针
    do {
      this.indexData.right[1] += 1
    } while (this.indexData.right[1] < this.chunkSize && this.getElementNode(this.indexData.right) === 0)
  }
  //判断同一列是否还有可消除的
  getColDatas() {
    //向上移动指针
    do {
      this.indexData.up[0] -= 1
    } while (this.indexData.up[0] >= 0 && this.getElementNode(this.indexData.up) === 0)
    //向下移动指针

    do {
      this.indexData.down[0] += 1
    } while (this.indexData.down[0] < this.twoDimensionalArr.length && this.getElementNode(this.indexData.down) === 0)
    //console.log(this.indexData)
  }
  //判断消除后 是否还有可消除的部分 包含未移动的部分
  //获取当前的二维数组
  getTwoDimensionalArr() {
    return this.twoDimensionalArr;
  }

  //设置移动方向
  setMove(move) {
    //this.moveDirStatus = false
    if (this.move !== move) {
      const setMoveDataFn = () => {
        this.move = move
        //this.moveDirStatus = true
        this.getMoveData()
      }
      if (this.move === '') {
        setMoveDataFn()
      } else {
        let n = this.directionArr.indexOf(this.move)
        if (n % 2 === 0 && move === this.directionArr[n - 1]) {
          setMoveDataFn()//1 3
        } else if (n % 2 === 1 && move === this.directionArr[n + 1]) {
          setMoveDataFn()//2 4
        }
      }
    }
  }
  //获取移动方向 及 轴
  getMove() {
    return {
      move: this.move,
      //移动轴线
      axis: [this.directionArr[3], this.directionArr[4]].includes(this.move) ? 'row' : 'col', // 上下移动的是移动的行  左右移动是移动的列
      //moveDirStatus: this.moveDirStatus,
      moveData: this.moveData // 移动的数据
    }
  }
  //清除移动方向
  clearMove() {
    this.move = ''
    //this.moveDirStatus = false
    this.moveData = []
  }
  //根据移动方向获取哪些块可以移动
  getMoveData() {
    //例如向右移动获取可以移动的块
    let pointer = -1
    this.moveData = []
    //['click', 'left', 'right', 'up', 'down']
    switch (this.move) {
      case this.directionArr[1]:
        pointer = this.clickIndexData[1]
        while (pointer >= 0 && this.getElementNode([this.clickIndexData[0], pointer]) !== 0) {
          this.moveData.push([this.clickIndexData[0], pointer])
          pointer -= 1
        }
        break;
      case this.directionArr[2]:
        pointer = this.clickIndexData[1]
        while (pointer < this.chunkSize && this.getElementNode([this.clickIndexData[0], pointer]) !== 0) {
          this.moveData.push([this.clickIndexData[0], pointer])
          pointer += 1
        }
        break;
      case this.directionArr[3]:
        pointer = this.clickIndexData[0]
        while (pointer >= 0 && this.getElementNode([pointer, this.clickIndexData[1]]) !== 0) {
          this.moveData.push([pointer, this.clickIndexData[1]])
          pointer -= 1
        }
        break;
      case this.directionArr[4]:
        pointer = this.clickIndexData[0]
        while (pointer < this.twoDimensionalArr.length && this.getElementNode([pointer, this.clickIndexData[1]]) !== 0) {
          this.moveData.push([pointer, this.clickIndexData[1]])
          pointer += 1
        }
        break;
      default:
        break;
    }
    //console.log('可移动的块', this.move, this.moveData)
  }
  //获取与某个值相等的所有的坐标
  getMoreNode(indexArr) {
    let data = this.getElementNode(indexArr)
    let arr = []
    this.twoDimensionalArr.forEach((item, index) => {
      item.forEach((item2, index2) => {
        if (item2 === data) {
          arr.push([index, index2])
          //console.log(index, index2)
        }
      })
    })
    console.log(data, arr)
    return arr
  }
}
// let elimination = new Elimination(36, 10)
// elimination.setIndex(1, 5)

// elimination.isrRemove()
//elimination.updataShuffle()
export default Elimination