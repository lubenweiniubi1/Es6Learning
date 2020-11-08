/**
Thunk 函数

Thunk 函数是自动执行 Generator 函数的一种方法。

参数的求值策略

Thunk 函数早在上个世纪60年代就诞生了。
那时，编程语言刚刚起步，计算机学家还在研究，编译器怎么写比较好。一个争论的焦点是"求值策略"，即函数的参数到底应该何时求值。
  */
if (0) {
  var x = 1

  function f(m) {
    return m * 2
  }

  f(x + 5)
}
/**
  上面代码先定义函数f，然后向它传入表达式x + 5。请问，这个表达式应该何时求值？
  
  一种意见是"传值调用"（call by value），即在进入函数体之前，就计算x + 5的值（等于6），再将这个值传入函数f。C语言就采用这种策略。
   */
if (0) {
  f(x + 5)
  // 传值调用时，等同于
  f(6)
}
/**
  另一种意见是“传名调用”（call by name），即直接将表达式x + 5传入函数体，只在用到它的时候求值。Haskell 语言采用这种策略。
   */
if (0) {
  f(x + 5)(
    // 传名调用时，等同于
    x + 5
  ) * 2
}
/**
  传值调用和传名调用，哪一种比较好？
  
  回答是各有利弊。传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。
   */
if (0) {
  function f(a, b) {
    return b
  }

  f(3 * x * x - 2 * x - 1, x)
}
/**
  上面代码中，函数f的第一个参数是一个复杂的表达式，但是函数体内根本没用到。对这个参数求值，实际上是不必要的。因此，有一些计算机学家倾向于"传名调用"，即只在执行时求值。
   */

/**
Thunk 函数的含义

编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
*/
if (0) {
  function f(m) {
    return m * 2
  }
  f(x + 5)

  //等同于

  const thunk = function () {
    return x + 5
  }

  function f2(thunk) {
    return thunk() * 2
  }
}
/**
上面代码中，函数f的参数x + 5被一个函数替换了。凡是用到原参数的地方，对Thunk函数求值即可。
这就是 Thunk 函数的定义，它是“传名调用”的一种实现策略，用来替换某个表达式。
 */

/**
JavaScript 语言的 Thunk 函数

JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。

在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。
  */
if (0) {
  //正常版本的readFile (多参数版本)
  fs.readFile(fileName, callback)

  //Thunk版本的readFile(单参数版本)
  const Thunk = function (fileName) {
    return function (callback) {
      return fs.readFile(fileName, callback)
    }
  }
  const readFileThunk = Thunk(fileName)
  readFileThunk(callback)
}
/**
上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。
经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。

任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。
*/
if (0) {
  // ES5版本
  var Thunk = function (fn) {
    return function () {
      var args = Array.prototype.slice.call(arguments)
      return function (callback) {
        args.push(callback)
        return fn.apply(this, args)
      }
    }
  }

  // ES6版本
  var Thunk = function (fn) {
    return function (...args) {
      return function (callback) {
        return fn.call(this, ...args, callback)
      }
    }
  }

  //使用上面的转换器，生成fs.readFile的 Thunk 函数。
  var readFileThunk = Thunk(fs.readFile)
  readFileThunk(fileA)(callback)
}

//下面是另一个完整的例子。
if (0) {
  function f(a, cb) {
    cb(a)
  }
  let ft = Thunk(f)

  let log = console.log.bind(console)
  ft(1)(log) // 1
}
