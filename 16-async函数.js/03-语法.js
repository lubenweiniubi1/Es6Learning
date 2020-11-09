/*
语法
async函数的语法规则总体上比较简单，难点是错误处理机制。

返回 Promise 对象
async函数返回一个 Promise 对象。

async函数内部return语句返回的值，会成为then方法回调函数的参数。
*/
if (0) {
  async function f() {
    return "hello world"
  }

  f().then((v) => console.log(v))
  // "hello world"
}
/**
 * 上面代码中，函数f内部return命令返回的值，会被then方法回调函数接收到。

async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
 */
if (0) {
  async function f() {
    throw new Error("出错了")
  }

  f().then(
    (v) => console.log(v),
    (e) => console.log(e)
  )
  // Error: 出错了
}

/**
Promise 对象的状态变化
async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。
也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

下面是一个例子。
*/
if (0) {
  async function getTitle(url) {
    let response = await fetch(url)
    let html = await response.text()
    return html.match(/<title>([\s\S]+)<\/title>/i)[1]
  }
  getTitle("https://tc39.github.io/ecma262/").then(console.log)
}
// "ECMAScript 2017 Language Specification"
/*
上面代码中，函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行then方法里面的console.log。
 */

/**
await 命令
正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
  */
if (0) {
  async function f() {
    return await 123
  }

  f().then((v) => console.log(v))
  // 123
}
/**
await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
 */
if (0) {
  async function f() {
    await Promise.reject("出错了")
  }

  f()
    .then((v) => console.log(v))
    .catch((e) => console.log(e))
  // 出错了
}
// 注意，上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。

// 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。
if (0) {
  async function f() {
    await Promise.reject("出错了")
    await Promise.resolve("hello world") // 不会执行
  }
}
//上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。

// 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
// 这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
if (1) {
  async function f() {
    try {
      await Promise.reject("出错了")
    } catch (e) {}
    return await Promise.resolve("hello world")
  }
  f().then((v) => console.log(v))
  // hello world
}
//另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
if (0) {
  async function f() {
    await Promise.reject("出错了").catch((e) => console.log(e))
    return await Promise.resolve("hello world")
  }

  f().then((v) => console.log(v))
  // 出错了
  // hello world
}
