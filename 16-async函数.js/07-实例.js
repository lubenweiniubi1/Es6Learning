/**
实例：按顺序完成异步操作
 */

// 实际开发中，经常遇到一组异步操作，需要按照顺序完成。比如，依次远程读取一组 URL，然后按照读取的顺序输出结果。
// Promise 的写法如下。
function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map((url) => {
    return fetch(url).then((response) => response.text())
  })

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise).then((text) => console.log(text))
  }, Promise.resolve())
}
// 上面代码使用fetch方法，同时远程读取一组 URL。每个fetch操作都返回一个 Promise 对象，放入textPromises数组。然后，reduce方法依次处理每个 Promise 对象，然后使用then，将所有 Promise 对象连起来，因此就可以依次输出结果。

// 这种写法不太直观，可读性比较差。下面是 async 函数实现。
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url)
    console.log(await response.text())
  }
}
// 上面代码确实大大简化，问题是所有远程操作都是继发。只有前一个URL返回结果，才会去读取下一个URL，这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async (url) => {
    const response = await fetch(url)
    return response.text()
  })

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise)
  }
}
// 上面代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。
//后面的for..of循环内部使用了await，因此实现了按顺序输出。





