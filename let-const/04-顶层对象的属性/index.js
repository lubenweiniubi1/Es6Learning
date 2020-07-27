//顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。
//ES5之中，顶层对象的属性与全局变量是等价的。

if (0) {
  window.a = 1 //window not defined ，node里面只有global
  console.log(a)
}

if (0) {
  global.b = 1
  console.log(b) // 1

  //上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。
}
/**
 * 顶层对象的属性与全局变量挂钩，被认为是JavaScript语言最大的设计败笔之一。
 * 这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，
 * 只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；
 * 其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；
 * 最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。
 * 另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。
 */

/**
 * ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，
 * 依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，
 * 不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
 * 只有window是这b样
 */

if (1) {
  var c = 2
  // 如果在Node的REPL(Read Eval Print Loop:交互式解释器)环境，可以写成global.a
  // 或者采用通用方法，写成this.a
  //   window.c // 2
  function d() {
    console.log("sabi")
  }
  console.log(1, this.d)

  /**
   * 上面代码中，全局变量a由var命令声明，所以它是顶层对象的属性；
   * 全局变量b由let命令声明，所以它不是顶层对象的属性，返回undefined。
   */
}
