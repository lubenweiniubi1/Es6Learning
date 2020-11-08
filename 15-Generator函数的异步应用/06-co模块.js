/**
基本用法
 
co 模块是著名程序员 TJ Holowaychuk 于2013年6月发布的一个小工具，用于 Generator 函数的自动执行。

下面是一个 Generator 函数，用于依次读取两个文件。
 */
const co = require('co')
const fs = require('fs')
const thunkify = require('thunkify')

if (0) {
  const readFile = thunkify(fs.readFile)
  const gen = function* () {
    const f1 = yield readFile('./file1.md')
    const f2 = yield readFile('./file2.md')
    console.log(f1.toString())
    console.log(f2.toString())
  }
  /*
上面代码中，Generator 函数只要传入co函数，就会自动执行。

co函数返回一个Promise对象，因此可以用then方法添加回调函数。
*/

  co(gen).then(() => console.log('Generator 函数执行完成'))
}
//上面代码中，等到 Generator 函数执行结束，就会输出一行提示。

/**
co 模块的原理
为什么 co 可以自动执行 Generator 函数？

前面说过，Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。

（1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。

（2）Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。

co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的yield命令后面，
只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co，详见后文的例子。

上一节已经介绍了基于 Thunk 函数的自动执行器。下面来看，基于 Promise 对象的自动执行器。这是理解 co 模块必须的。
 */

/**
基于 Promise 对象的自动执行
还是沿用上面的例子。首先，把fs模块的readFile方法包装成一个 Promise 对象。
 */
if (1) {
  const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
      fs.readFile(fileName, function (err, data) {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }
  const gen = function* () {
    const f1 = yield readFile('./file1.md')
    const f2 = yield readFile('./file2.md')
    console.log(f1.toString())
    console.log(f2.toString())
  }
  if (0) {
    //然后，手动执行上面的 Generator 函数。
    const g = gen()

    g.next().value.then((data) => {
      g.next(data).value.then((data) => {
        g.next(data)
      })
    })
  }
  //手动执行其实就是用then方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。
  if (1) {
    function run(gen) {
      const g = gen()
      function next(data) {
        const result = g.next(data)
        console.log(result)

        if (result.done) {
          return result.value
        }
        result.value.then((data) => {
          next(data)
        })
      }

      next()
    }

    run(gen)
  }
  //上面代码中，只要 Generator 函数还没执行到最后一步，next函数就调用自身，以此实现自动执行。
}
/**
co 模块的源码
co 就是上面那个自动执行器的扩展，它的源码只有几十行，非常简单。

首先，co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。
 */
if (0) {
  function co(gen) {
    var ctx = this

    return new Promise(function (resolve, reject) {})
  }
}
// 在返回的 Promise 对象里面，co 先检查参数gen是否为 Generator 函数。如果是，就执行该函数，得到一个内部指针对象；
//如果不是就返回，并将 Promise 对象的状态改为resolved。

function co(gen) {
  var ctx = this

  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx)
    if (!gen || typeof gen.next !== 'function') return resolve(gen)
  })
}
// 接着，co 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。
function co(gen) {
  var ctx = this

  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx)
    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled()
    function onFulfilled(res) {
      var ret
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }
  })
}
// 最后，就是关键的next函数，它会反复调用自身。

function next(ret) {
  if (ret.done) {
    return resolve(ret.value)
  }
  var value = toPromise.call(ctx, ret.value)
  if (value && isPromise(value)) {
    return value.then(onFulfilled, onRejected)
  }
  return onRejected(
    new TypeError(
      'You may only yield a function, promise, generator, array, or object, ' +
        'but the following object was passed: "' +
        String(ret.value) +
        '"'
    )
  )
}
/**
上面代码中，next函数的内部代码，一共只有四行命令。

第一行，检查当前是否为 Generator 函数的最后一步，如果是就返回。

第二行，确保每一步的返回值，是 Promise 对象。

第三行，使用then方法，为返回值加上回调函数，然后通过onFulfilled函数再次调用next函数。

第四行，在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为rejected，从而终止执行。
*/
/**
处理并发的异步操作
co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。

这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面。
 */
// 数组的写法
co(function* () {
  var res = yield [Promise.resolve(1), Promise.resolve(2)]
  console.log(res)
}).catch(onerror)

// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  }
  console.log(res)
}).catch(onerror)
// 下面是另一个例子。

co(function* () {
  var values = [n1, n2, n3]
  yield values.map(somethingAsync)
})

function* somethingAsync(x) {
  // do something async
  return y
}
// 上面的代码允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步。

