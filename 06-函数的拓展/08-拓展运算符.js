//扩展运算符（spread）是三个点（...）。
//它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
if (0) {
  console.log(...[1, 2, 3]) // 1 2 3
  console.log(1, ...[4, 2, 3], 5) // 1 4 2 3 5
}

//该运算符主要用于函数调用。
if (1) {
  //这里的函数声明是全局的，别忘了
  function push(array, ...items) {
    array.push(...items)
  }

  function add(x, y) {
    return x + y
  }
  const numberz = [4, 28]
  console.log(add(...numberz))
}
//上面代码中，array.push(...items)和add(...numbers)这两行，都是函数的调用，
//它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列。