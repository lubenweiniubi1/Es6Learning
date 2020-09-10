//什么是尾调用？
// 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，
//一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
/**
 * 
 function f(x){
  return g(x);
}
上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。

以下三种情况，都不属于尾调用。

// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
上面代码中，情况一是调用函数g之后，还有赋值操作，所以不属于尾调用，
即使语义完全一样。
情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。
function f(x){
  g(x);
  return undefined;
}

尾调用不一定出现在函数尾部，只要是最后一步操作即可。

function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。


尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），
保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，
那么在A的调用帧上方，还会形成一个B的调用帧。
等到B运行结束，将结果返回到A，B的调用帧才会消失。
如果函数B内部还调用函数C，那就还有一个C的调用帧，
以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，
因为调用位置、内部变量等信息都不会再用到了，
只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
 */
var g = function () {}
function f() {
  let m = 1
  let n = 2
  return g(m + n)
}
f()

// 等同于
function f1() {
  return g(3)
}
f1()

// 等同于
g(3)
/**
上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。
但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f(x) 的调用帧，
只保留 g(3) 的调用帧。

这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。
如果所有函数都是尾调用，
那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。
这就是“尾调用优化”的意义。

注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，
否则就无法进行“尾调用优化”。

 */
function addOne(a) {
  var one = 1
  function inner(b) {
    return b + one
  }
  return inner(a)
}
//上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。

/**
 * 尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用帧，
很容易发生“栈溢出”错误（stack overflow）。
但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
 */

function factorial(n) {
  if (n === 1) {
    return 1
  }
  return n * factorial(n - 1)
}
//上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

//如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function facotrial_G(n, total) {
  if (n === 1) return total
  return factorial(n - 1, n * total)
}
if (0) {
  console.log(facotrial_G(5, 1)) //24
}

//还有一个比较著名的例子，就是计算fibonacci 数列，也能充分说明尾递归优化的重要性

//如果是非尾递归的fibonacci 递归方法
function Fibonacci(n) {
  if (n <= 1) return 1
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}
if (0) {
  console.log(Fibonacci(10))
  console.log(Fibonacci(100)) //这里明显卡顿 ，卡死了 算了
}
//如果我们使用尾递归优化过的fibonacci递归算法

function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) return ac2
  return Fibonacci2(n - 1, ac2, ac1 + ac2)
}

if (1) {
  console.log(Fibonacci2(10))
  console.log(Fibonacci2(100)) //很快就出来了 卧槽！卧槽！卧槽！卧槽！卧槽！卧槽！
}
/**
 * 由此可见，“尾调用优化”对递归操作意义重大，
 * 所以一些函数式编程语言将其写入了语言规格。ES6也是如此，
 * 第一次明确规定，所有ECMAScript的实现，
 * 都必须部署“尾调用优化”。这就是说，在ES6中，只要使用尾递归，
 * 就不会发生栈溢出，相对节省内存。
 */

/**
 * 递归函数的改写
尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，
就是把所有用到的内部变量改写成函数的参数。
比如上面的例子，阶乘函数 factorial 需要用到一个中间变量 total ，
那就把这个中间变量改写成函数的参数。
这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，
需要传入两个参数5和1？

两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。
 */
function tailFactorial(n, total) {
  if (n === 1) return total
  return tailFactorial(n - 1, n * total)
}

function factorial(n) {
  return tailFactorial(n, 1)
}

factorial(5) // 120

//第二种方法就简单多了，就是采用ES6的函数默认值。

function factorial(n, total = 1) {
  if (n === 1) return total
  return factorial(n - 1, n * total)
}

factorial(5) // 120
