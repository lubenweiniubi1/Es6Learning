//如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。
if (0) {
  function* foo() {
    yield 'a'
    yield 'b'
  }

  function* bar() {
    yield 'x'
    foo()
    yield 'y'
  }
  for (let v of bar()) {
    console.log(v)
  }
  // "x"
  // "y"
}
//上面代码中，foo和bar都是 Generator 函数，在bar里面调用foo，是不会有效果的。

//这个就需要用到yield*语句，用来在一个 Generator 函数里面执行另一个 Generator 函数。
if (0) {
  function* bar2() {
    yield 'x'
    yield* foo()
    yield 'y'
  }

  //等价于
  function* bar3() {
    yield 'x'
    yield 'a'
    yield 'b'
    yield 'y'
  }

  // 等同于
  function* bar4() {
    yield 'x'
    for (let v of foo()) {
      yield v
    }
    yield 'y'
  }
}

//再来看一个对比的例子
if (0) {
  function* inner() {
    yield 'hello!'
  }

  function* outer1() {
    yield 'open'
    yield inner()
    yield 'close'
  }
  const gen = outer1()
  console.log(gen.next().value) // "open"
  console.log(gen.next().value) // 返回一个遍历器对象 Object [Generator] {}
  console.log(gen.next().value) // "close"

  function* outer2() {
    yield 'open'
    yield* inner()
    yield 'close'
  }

  const gen2 = outer2()
  console.log(gen2.next().value) // "open"
  console.log(gen2.next().value) // 'hello'
  console.log(gen2.next().value) // "close"
}
//上面例子中，outer2使用了yield*，outer1没使用。结果就是，outer1返回一个遍历器对象，outer2返回该遍历器对象的内部值。

//从语法角度看，如果yield命令后面跟的是一个遍历器对象，需要在yield命令后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*语句。
if (0) {
  let delegatedIterator = (function* () {
    yield 'Hello!'
    yield 'Bye!'
  })()

  let delegatingIterator = (function* () {
    yield 'Greetings!'
    yield* delegatedIterator
    yield 'Ok, bye.'
  })()

  for (let value of delegatingIterator) {
    console.log(value)
  }
  // "Greetings!
  // "Hello!"
  // "Bye!"
  // "Ok, bye."
}
//上面代码中，delegatingIterator是代理者，delegatedIterator是被代理者。
//由于yield* delegatedIterator语句得到的值，是一个遍历器，所以要用星号表示。
//运行结果就是使用一个遍历器，遍历了多个Generator函数，有递归的效果。

//yield*后面的Generator函数（没有return语句时），等同于在Generator函数内部，部署一个for...of循环。
if (0) {
  function* concat1(iter1, iter2) {
    yield* iter1
    yield* iter2
  }

  // 等同于

  function* concat(iter1, iter2) {
    for (var value of iter1) {
      yield value
    }
    for (var value of iter2) {
      yield value
    }
  }
}
//上面代码说明，yield*后面的Generator函数（没有return语句时），不过是for...of的一种简写形式，
//完全可以用后者替代前者。反之，则需要用var value = yield* iterator的形式获取return语句的值。

//如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。
if (0) {
  function* gen() {
    yield* ['a', 'b', 'c']
  }

  gen().next() // { value:"a", done:false }
}
//上面代码中，yield命令后面如果不加星号，返回的是整个数组，加了星号就表示返回的是数组的遍历器对象。

//实际上，任何数据结构只要有Iterator接口，就可以被yield*遍历。
if (0) {
  let read = (function* () {
    yield 'hello'
    yield* 'hello'
  })()

  read.next().value // "hello"
  read.next().value // "h"
}
//上面代码中，yield语句返回整个字符串，yield*语句返回单个字符。因为字符串具有Iterator接口，所以被yield*遍历。

//如果被代理的Generator函数有return语句，那么就可以向代理它的Generator函数返回数据。
if (0) {
  function* foo() {
    yield 2
    yield 3
    return 'foo'
  }

  function* bar() {
    yield 1
    var v = yield* foo()
    console.log('v: ' + v)
    yield 4
  }

  var it = bar()

  it.next()
  // {value: 1, done: false}
  it.next()
  // {value: 2, done: false}
  it.next()
  // {value: 3, done: false}
  it.next()
  // "v: foo"
  // {value: 4, done: false}
  it.next()
  // {value: undefined, done: true}
}
//上面代码在第四次调用next方法的时候，屏幕上会有输出，这是因为函数foo的return语句，向函数bar提供了返回值。再看一个例子。
if (0) {
  function* genFuncWithReturn() {
    yield 'a'
    yield 'b'
    return 'The result'
  }
  function* logReturned(genObj) {
    let result = yield* genObj
    console.log(result)
  }

  console.log([...logReturned(genFuncWithReturn())])
  // The result 内层log
  // 值为 [ 'a', 'b' ] 外部log出所有成员
}
/**
 * 上面代码中，存在两次遍历。
 * 第一次是扩展运算符遍历函数logReturned返回的遍历器对象，
 * 第二次是yield*语句遍历函数genFuncWithReturn返回的遍历器对象。
 * 这两次遍历的效果是叠加的，最终表现为扩展运算符遍历函数genFuncWithReturn返回的遍历器对象。
 * 所以，最后的数据表达式得到的值等于[ 'a', 'b' ]。
 * 但是，函数genFuncWithReturn的return语句的返回值The result，会返回给函数logReturned内部的result变量，因此会有终端输出。
 */

// yield*命令可以很方便地取出嵌套数组的所有成员。
if (0) {
  function* iterTree(tree) {
    if (Array.isArray(tree)) {
      for (let i = 0; i < tree.length; i++) {
        yield* iterTree(tree[i])
      }
    } else {
      yield tree
    }
  }

  const tree = ['a', ['b', 'c'], ['d', 'e']]

  for (let x of iterTree(tree)) {
    console.log(x)
  }
}

//下面是一个稍微复杂的例子，使用yield*语句遍历完全二叉树。
if (1) {
  // 下面是二叉树的构造函数，
  // 三个参数分别是左树、当前节点和右树
  function Tree(left, label, right) {
    this.left = left
    this.label = label
    this.right = right
  }

  // 下面是中序（inorder）遍历函数。
  // 由于返回的是一个遍历器，所以要用generator函数。
  // 函数体内采用递归算法，所以左树和右树要用yield*遍历
  function* inorder(t) {
    if (t) {
      yield* inorder(t.left)
      yield t.label
      yield* inorder(t.right)
    }
  }

  // 下面生成二叉树
  function make(array) {
    // 判断是否为叶节点
    if (array.length == 1) {
      return new Tree(null, array[0], null)
    }
    return new Tree(make(array[0]), array[1], make(array[2]))
  }

  let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]])

  let result = []
  for (let node of inorder(tree)) {
    result.push(node)
  }
  console.log(result)
}
