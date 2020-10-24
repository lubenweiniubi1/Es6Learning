/**
 yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。
 */
if (1) {
  function* f() {
    for (let i = 0; true; i++) {
      let reset = yield i
      if (reset) {
        i = -1
      }
    }
  }
  const g = f()
  console.log(g.next())
  console.log(g.next())
  console.log(g.next())
  console.log(g.next())
  console.log(g.next(true))
}
/**
 上面代码先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield语句，变量reset的值总是undefined。
 当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

 这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。
 通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。
 也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
 */