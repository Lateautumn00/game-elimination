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
  // colIndex=0;
  // rowIndex=0;
  indexData = {
    click: [],
    left: [],
    right: [],
    up: [],
    down: []
  }//当前点 前后左右四个方向对应非0值的坐标
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
      [36, 24, 18, 19, 13, 0, 8, 28, 26, 12],
      [18, 3, 1, 10, 19, 30, 27, 4, 24, 30],
      [28, 29, 31, 2, 34, 0, 19, 36, 6, 26],
      [1, 17, 13, 23, 3, 0, 9, 27, 2, 13],
      [36, 7, 19, 28, 7, 0, 7, 25, 25, 21],
      [5, 33, 34, 10, 11, 0, 18, 32, 31, 20],
      [34, 27, 11, 22, 7, 0, 23, 28, 5, 17],
      [12, 16, 12, 5, 15, 0, 15, 20, 26, 35],
      [16, 35, 24, 24, 21, 0, 34, 33, 29, 27],
      [5, 17, 32, 25, 31, 0, 29, 25, 11, 26],
      [23, 2, 8, 16, 14, 0, 22, 1, 36, 32],
      [32, 6, 31, 8, 11, 0, 19, 22, 35, 4]
    ]
  }

  /**
   * 设置当前点击的坐标  位置从0开始
   * @param {*} rowIndex 第几列
   * @param {*} colIndex 第几行
   */
  setIndex(indexArr) {
    if (indexArr[0] < 0 || indexArr[0] > this.twoDimensionalArr.length) {
      throw new Error("行超出范围")
    }
    if (indexArr[1] < 0 || indexArr[1] > this.chunkSize) {
      throw new Error("列超出范围")
    }
    this.indexData.click = indexArr//设置当前点击的坐标
    this.indexData.left = [indexArr[0], -1]//初始化对应的left
    this.indexData.right = [indexArr[0], -1]//初始化对应的right
    this.indexData.up = [-1, indexArr[1]]//初始化对应的up
    this.indexData.down = [-1, indexArr[1]]//初始化对应的down
    this.getRowDatas()//更新对应的left right  0 跳过
    this.getColDatas()//更新对应的up down  0 跳过
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
  /**
   * 根据位置获取元素
   */
  getElement(type) {
    if (Object.keys(this.indexData).includes(type) === false) return -1;//判断是否包含该类型 left right up down
    if (this.indexData[type].includes(-1) === true) return -1;//判断数组是否有-1   表示  在行或者列 上没有对应的元素   全是0
    const rowData = this.twoDimensionalArr[this.indexData[type][0]];
    return rowData[this.indexData[type][1]];
  }
  //设置某个位置的数据
  setElementNode(indexArr, value) {
    const rowData = this.twoDimensionalArr[indexArr[0]];
    rowData[indexArr[1]] = value;
  }
  //获取点的数据
  getElementNode(indexArr) {
    const rowData = this.twoDimensionalArr[indexArr[0]];
    //console.log(indexArr, rowData[indexArr[1]])
    return rowData[indexArr[1]];
  }
  //判断当前点与上下左右四个方向是否有相同的元素消除
  isrRemove() {
    return {
      left: [...this.indexData.left, this.getElement('left') === this.getElement('click')],
      right: [...this.indexData.right, this.getElement('right') === this.getElement('click')],
      up: [...this.indexData.up, this.getElement('up') === this.getElement('click')],
      down: [...this.indexData.down, this.getElement('down') === this.getElement('click')]
    }
  }
  /**
   * 更新click 对应的left right
   */
  getRowDatas() {
    this.indexData.left[1] = this.indexData.click[1] - 1 >= 0 ? this.indexData.click[1] - 1 : -1
    this.indexData.right[1] = this.indexData.click[1] + 1 < this.chunkSize ? this.indexData.click[1] + 1 : -1
    //向左移动指针
    while (this.indexData.left[1] >= 0 && this.getElement('left') === 0) {
      this.indexData.left[1] = this.indexData.left[1] - 1 >= 0 ? this.indexData.left[1] - 1 : -1
    }
    //向右移动指针
    while (this.indexData.right[1] >= 0 && this.getElement('right') === 0) {
      this.indexData.right[1] = this.indexData.right[1] + 1 < this.chunkSize ? this.indexData.right[1] + 1 : -1
    }
    //console.log(this.indexData)
  }
  //判断同一列是否还有可消除的
  getColDatas() {
    this.indexData.up[0] = this.indexData.click[0] - 1 >= 0 ? this.indexData.click[0] - 1 : -1
    this.indexData.down[0] = this.indexData.click[0] + 1 < this.twoDimensionalArr.length ? this.indexData.click[0] + 1 : -1
    //向上移动指针
    while (this.indexData.up[0] >= 0 && this.getElement('up') === 0) {
      this.indexData.up[0] = this.indexData.up[0] - 1 >= 0 ? this.indexData.up[0] - 1 : -1
    }
    //向下移动指针
    while (this.indexData.down[0] >= 0 && this.getElement('down') === 0) {
      this.indexData.down[0] = this.indexData.down[0] + 1 < this.twoDimensionalArr.length ? this.indexData.down[0] + 1 : -1
    }
    // console.log(this.twoDimensionalArr)
    // console.log(this.indexData)
  }
  //判断消除后 是否还有可消除的部分 包含未移动的部分
  //获取当前的二维数组
  getTwoDimensionalArr() {
    return this.twoDimensionalArr;
  }
}
// let elimination = new Elimination(36, 10)
// elimination.setIndex(1, 5)

// elimination.isrRemove()
//elimination.updataShuffle()
export default Elimination