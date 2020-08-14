{
  let a = 10
  var b = 1
}

// console.log(a) // ReferenceError: a is not defined.
console.log(b) // 1

//下面的代码如果使用var，最后输出的是10

var a = []
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i)
  }
}
a[6]() // 10
/**
 *  上面代码中，变量i是var声明的，在全局范围内都有效，所以全局只有一个变量i。
 *  每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的function在运行时，会通过闭包读到这同一个变量i，
 *  导致最后输出的是最后一轮的i的值，也就是10。
 */
var b = []
for (let i = 0; i < 10; i++) {
  b[i] = function () {
    console.log(i)
  }
}
b[6]() // 6
/**
 * 上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。
 * 你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？
 * 这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。
 */

//另外，for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。

for (let i = 0; i < 3; i++) {
  let i = "abc" //这里的i只在子作用域有效，所以i++的时候 JavaScript引擎记住的并不是 'abc'
  console.log(i)
}
// abc
// abc
// abc
//上面代码输出了3次abc，这表明函数内部的变量i和外部的变量i是分离的。

//变量提升失效
console.log(foo) //输出undefined
var foo = "sabi" //不报错
/**
 * 上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。
 *  变量foo1用let命令声明，不会发生变量提升。这表示在声明它之前，变量foo1是不存在的，这时如果用到它，就会抛出一个错误。
 */
//变量提升失效
// console.log(foo1) // Cannot access 'foo1' before initialization
// let foo1 = 'sabi' //


