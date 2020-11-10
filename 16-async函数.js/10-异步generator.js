/*
异步Generator函数
就像 Generator 函数返回一个同步遍历器对象一样，异步 Generator 函数的作用，是返回一个异步遍历器对象。

在语法上，异步 Generator 函数就是async函数与 Generator 函数的结合。
*/
if (0) {
  async function* readLines(path) {
    let file = await fileOpen(path)

    try {
      while (!file.EOF) {
        yield await file.readLine()
      }
    } finally {
      await file.close()
    }
  }
}
// 上面代码中，异步操作前面使用await关键字标明，即await后面的操作，应该返回Promise对象。
//凡是使用yield关键字的地方，就是next方法的停下来的地方，它后面的表达式的值（即await file.readLine()的值），
//会作为next()返回对象的value属性，这一点是于同步Generator函数一致的。

// 可以像下面这样，使用上面代码定义的异步Generator函数。
if (0) {
  for await (const line of readLines(filePath)) {
    console.log(line)
  }
}
// 异步 Generator 函数可以与for await...of循环结合起来使用。
if (0) {
  async function* prefixLines(asyncIterable) {
    for await (const line of asyncIterable) {
      yield "> " + line
    }
  }
}
// yield命令依然是立刻返回的，但是返回的是一个Promise对象。
if (0) {
  async function* asyncGenerator() {
    console.log("Start")
    const result = await doSomethingAsync() // (A)
    yield "Result: " + result // (B)
    console.log("Done")
  }
}
// 上面代码中，调用next方法以后，会在B处暂停执行，yield命令立刻返回一个Promise对象。
//这个Promise对象不同于A处await命令后面的那个 Promise 对象。
//主要有两点不同，一是A处的Promise对象resolve以后产生的值，会放入result变量；
//二是B处的Promise对象resolve以后产生的值，是表达式'Result： ' + result的值；二是A处的 Promise 对象一定先于B处的 Promise 对象resolve。

// 如果异步 Generator 函数抛出错误，会被 Promise 对象reject，然后抛出的错误被catch方法捕获。
if (0) {
  async function* asyncGenerator() {
    throw new Error("Problem!")
  }

  asyncGenerator()
    .next()
    .catch((err) => console.log(err)) // Error: Problem!
}
// 注意，普通的 async 函数返回的是一个 Promise 对象，而异步 Generator 函数返回的是一个异步Iterator对象。
//基本上，可以这样理解，async函数和异步 Generator 函数，是封装异步操作的两种方法，都用来达到同一种目的。
//区别在于，前者自带执行器，后者通过for await...of执行，或者自己编写执行器。下面就是一个异步 Generator 函数的执行器。
if (0) {
  async function takeAsync(asyncIterable, count = Infinity) {
    const result = []
    const iterator = asyncIterable[Symbol.asyncIterator]()
    while (result.length < count) {
      const { value, done } = await iterator.next()
      if (done) break
      result.push(value)
    }
    return result
  }
}
// 上面代码中，异步Generator函数产生的异步遍历器，会通过while循环自动执行，每当await iterator.next()完成，就会进入下一轮循环。

// 下面是这个自动执行器的一个使用实例。
if (0) {
  async function f() {
    async function* gen() {
      yield "a"
      yield "b"
      yield "c"
    }

    return await takeAsync(gen())
  }

  f().then(function (result) {
    console.log(result) // ['a', 'b', 'c']
  })
}

// 异步 Generator 函数出现以后，JavaScript就有了四种函数形式：普通函数、async 函数、Generator 函数和异步 Generator 函数。
//请注意区分每种函数的不同之处。

// 最后，同步的数据结构，也可以使用异步 Generator 函数。
if (0) {
  async function* createAsyncIterable(syncIterable) {
    for (const elem of syncIterable) {
      yield elem
    }
  }
}
// 上面代码中，由于没有异步操作，所以也就没有使用await关键字。

// yield * 语句
//yield*语句也可以跟一个异步遍历器。
if (0) {
  async function* gen1() {
    yield "a"
    yield "b"
    return 2
  }

  async function* gen2() {
    const result = yield* gen1()
  }
}
// 上面代码中，gen2函数里面的result变量，最后的值是2。

// 与同步Generator函数一样，for await...of循环会展开yield*。
if (0) {
  ;(async function () {
    for await (const x of gen2()) {
      console.log(x)
    }
  })()
  // a
  // b
}
