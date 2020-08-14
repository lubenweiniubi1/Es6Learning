//第一种场景，内层变量可能会覆盖外层变量。
if (1) {
  var tmp = new Date()

  function f() {
    console.log("1   " + tmp)
    if (false) {
      var tmp = "hello world"
    }
  }
  f() // undefined

  /**
   * 上面代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。
   * 但是，函数f执行后，输出结果为undefined，
   * 原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。
   *
   */
}

//第二种场景，用来计数的循环变量泄露为全局变量。
if (0) {
  var s = "hello"
  for (var i = 0; i < s.length; i++) {
    console.log(s[i])
  }
  console.log(i)

  //上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。
}


