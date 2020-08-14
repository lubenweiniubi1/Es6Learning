if (0) {
  function add([x, y]) {
    return x + y
  }
  console.log(add([1, 2])) //3

  /**
   * 上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，
   * 数组参数就被解构成变量x和y。
   * 对于函数内部的代码来说，它们能感受到的参数就是x和y。
   */
}

if (0) {
  const arr = [
    [1, 2],
    [3, 4],
  ].map(([a, b]) => a + b)
  console.log(arr)
}
if (0) {
  //函数参数的解构也可以使用默认值。
  function move({ x = 0, y = 0 } = {}) {
    // let { x = 0, y = 0 } = this.props || {}
    //等号左边解构，如果调用函数没有传参，就解构等号右边的默认值,参数默认值
    return [x, y]
  }
  console.log(move({ x: 3, y: 8 })) // [3, 8]
  console.log(move()) //  [0,0]
  console.log(move({ x: 3 })) // [3, 0]
  console.log(move({})) // [0, 0]
  /**
   * 上面代码中，函数move的参数是一个对象，
   * 通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x和y等于默认值。
   */
}

if (0) {
  function move({ x, y } = { x: 0, y: 0 }) {
    return [x, y]
  }
  console.log(move({ x: 3, y: 8 })) // [3, 8]
  console.log(move()) //  [0,0]
  console.log(move({ x: 3 })) // [3, undefined]
  console.log(move({})) // [undefined, undefined]
}
/**
 * 上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。
 * undefined就会触发函数参数的默认值
 */
if (1) {
  console.log([1, undefined, 3].map((x = "yes") => x))
}
