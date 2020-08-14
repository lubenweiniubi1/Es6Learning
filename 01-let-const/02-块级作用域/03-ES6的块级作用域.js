/**
 * let实际上为 JavaScript 新增了块级作用域
 */
if (0) {
  function f1() {
    let n = 5
    if (true) {
      let n = 10
      console.log(n) //10
    }
    console.log(n) //5
  }
  f1()

  /**
   * 上面的函数有两个代码块，都声明了变量n，运行后输出5。
   * 这表示外层代码块不受内层代码块的影响。
   * 如果使用var定义变量n，最后输出的值就是10。
   */

  //ES6 允许块级作用域的任意嵌套。

  {
    {
      let insane = "Hello World"
    }
  }

  //内层作用域可以定义外层作用域的同名变量。
  {
    {
      {
        {
          let insane = "Hello World"
          {
            let insane = "Hello World"
          }
        }
      }
    }
  }
}

//块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE  Immediately Invoked Function Expression，意为立即调用的函数表达式）不再必要了
if (0) {
  ;(function () {
    var temp = 10
    console.log(temp)
  })()
  //   console.log(temp) //err

  {
    let temp = 5
    console.log(temp)
  }
  console.log(temp) //err
}

//ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
//ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
//{block1}
if (0) {
  function f() {
    console.log("I am outside!")
  }
  ;(function () {
    if (false) {
      function f() {
        console.log("I am inside!")
      }
    }
    f() //Im out side
  })
}

//上面代码在 ES5 中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下
//{block2}
if (0) {
  // ES5 环境
  function f() {
    console.log("I am outside!")
  }

  ;(function () {
    function f() {
      console.log("I am inside!")
    }
    if (false) {
    }
    f() //I am inside!
  })()
}
/**
 * ES6 就完全不一样了，理论上会得到“I am outside!”。
 * 因为块级作用域内声明的函数类似于let，对作用域之外没有影响。
 * 但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？
 * 原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。
 * 为了减轻因此产生的不兼容问题，ES6在附录B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
 *          1.允许在块级作用域内声明函数。
 *          2.函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
 *          3.同时，函数声明还会提升到所在的块级作用域的头部。
 * 注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，
 * 还是将块级作用域的函数声明当作let处理。
 */

//根据这三条规则，在浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于var声明的变量。
//{block1}的代码在符合 ES6 的浏览器中，都会报错，因为实际运行的是下面的代码
if (1) {
  // 浏览器的 ES6 环境
  function f() {
    console.log("I am outside!")
  }
  ;(function () {
    var f
    if (false) {
      function f() {
        console.log("inside")
      }
    }

    f() // f is not a function
  })()
}

//请看03-test.html 真实环境测试

//考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。
//如果确实需要，也应该写成函数表达式，而不是函数声明语句。
if (0) {
  // 函数声明语句
  {
    let a = "secret"
    function f() {
      return a
    }
  }

  // 函数表达式
  {
    let a = "secret"
    let f = function () {
      return a
    }
  }
}

//另外，还有一个需要注意的地方。ES6 的块级作用域允许声明函数的规则，
//只在使用大括号的情况下成立，如果没有使用大括号，就会报错。
if (1) {
  // 不报错
  if (true) {
    function f() {}
  }

  // 报错
  if (true) function f() {}
}
