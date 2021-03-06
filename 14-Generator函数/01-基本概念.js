/**
 * Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
本章详细介绍Generator 函数的语法和 API，它的异步编程应用请看《Generator 函数的异步应用》一章。

Generator 函数有多种理解角度。
从语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。
一是，function关键字与函数名之间有一个星号；
二是，函数体内部使用yield语句，定义不同的内部状态（yield在英语里的意思就是“产出”）。    
 */
if (0) {
  function* helloWorldGenerator() {
    yield "hello"
    yield "world"
    return "end"
  }
  const hw = helloWorldGenerator()
}

/**
 * 上面代码定义了一个Generator函数helloWorldGenerator，它内部有两个yield语句“hello”和“world”，
即该函数有三个状态：hello，world和return语句（结束执行）。
然后，Generator函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。
不同的是，调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。
换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。
 */
if (1) {
  function* helloWorldGenerator() {
    yield "hello"
    yield "world"
    return "end"
  }
  const hw = helloWorldGenerator()
  console.log(hw.next())
  console.log(hw.next())
  console.log(hw.next())
  console.log(hw.next())
  /**{ value: 'hello', done: false } 
    { value: 'world', done: false } 
    { value: 'end', done: true }    
    { value: undefined, done: true }
  */
}
/**
 * 上面代码一共调用了四次next方法。

第一次调用，Generator函数开始执行，直到遇到第一个yield语句为止。next方法返回一个对象，它的value属性就是当前yield语句的值hello，done属性的值false，表示遍历还没有结束。

第二次调用，Generator函数从上次yield语句停下的地方，一直执行到下一个yield语句。next方法返回的对象的value属性就是当前yield语句的值world，done属性的值false，表示遍历还没有结束。

第三次调用，Generator函数从上次yield语句停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。

第四次调用，此时Generator函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。

总结一下，调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结
 */

 /**ES6没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。
function * foo(x, y) { ··· }

function *foo(x, y) { ··· }

function* foo(x, y) { ··· }

function*foo(x, y) { ··· }

由于Generator函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。
  * */
  