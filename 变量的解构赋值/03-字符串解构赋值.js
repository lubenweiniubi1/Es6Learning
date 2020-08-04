if (0) {
  // /字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
  const [a, b, c, d, e] = "hello"
  console.log(a)
  console.log(b)
  console.log(c)
  console.log(d)
  console.log(e)
}

if (1) {
  //类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
  let { length: len } = "hello"
  console.log(len)//5
}
