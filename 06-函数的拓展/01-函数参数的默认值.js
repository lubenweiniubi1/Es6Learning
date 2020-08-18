//ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
if (0) {
  function log(x, y = "World") {
    console.log(x, y)
  }
  log("Hello") //Hello World
}

/**
 * 除了简洁，ES6 的写法还有两个好处：
 *    首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；
 *    其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。
 */
//参数变量是默认声明的，所以不能用let或const再次声明
if (0) {
  function foo(x = 5) {
    // let x = 1
    // const x = 10
    //SyntaxError: Identifier 'x' has already been declared
  }
}
//使用参数默认值时，函数不能有同名参数。
if (0) {
  function foo(x, x) {
    console.log(x)
  }
  foo(1, 2) //2
  //   function foo2(x, x,y=10) {//SyntaxError: Duplicate parameter name not allowed in this context
  //     console.log(x)
  //   }
}
//另外，一个容易忽略的地方是，如果参数默认值是变量，那么参数就不是传值的，
//而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
if (1) {
  let x = 99
  function foo(p = x + 1) {
    console.log(p)
  }
  foo()//100
  x= 100
  foo()//101
}
//上面代码中，参数p的默认值是x + 1。这时，每次调用函数foo，都会重新计算x + 1，而不是默认p等于 100。
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
