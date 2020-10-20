/**
 * 两个有用的附加方法
ES6的Promise API提供的方法不是很多，有些有用的方法可以自己部署。下面介绍如何部署两个不在ES6之中、但很有用的方法。

done()
Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。
因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。
asyncFunc()
  .then(f1)
  .catch(r1)
  .then(f2)
  .done();
 */

//它的实现代码相当简单。
Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected).catch((reason) =>
    setTimeout(() => {
      throw reason
    }, 0)
  )
}
//从上面代码可见，done方法的使用，可以像then方法那样用，提供Fulfilled和Rejected状态的回调函数，也可以不提供任何参数。但不管怎样，done都会捕捉到任何可能出现的错误，并向全局抛出。

/**
   * finally()
  finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。
  
  下面是一个例子，服务器使用Promise处理请求，然后使用finally方法关掉服务器。
  server.listen(0)
    .then(function () {
      // run test
    })
    .finally(server.stop);
   */

//它的实现也很简单。
Promise.prototype.finally = function (callback) {
  let p = this.constructor
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason
      })
  )
}
