/**
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）。
只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。
只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。

首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 stream 模式是比部署Promise更好的选择。
 * 
 */

//ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
//下面代码创造了一个Promise实例。
var promise = new Promise(function (resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */ 1) {
    // resolve(value)
  } else {
    // reject(error)
  }
})
/**
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。
 */
promise.then(
  function (value) {
    //success
  },
  function (value) {
    //failure
  }
)
//then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

//下面是一个Promise对象的简单例子。
if (0) {
  function timeout(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms, "done")
    })
  }
  timeout(100).then((value) => {
    console.log(value)
  })
}
//上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间（ms参数）以后，Promise实例的状态变为Resolved，就会触发then方法绑定的回调函数。

//Promise新建后就会立即执行
if (0) {
  let promise = new Promise(function (resolve, reject) {
    console.log("Promise")
    resolve()
  })
  promise.then(function () {
    console.log("resolved")
  })
  let promise2 = new Promise(function (resolve, reject) {
    console.log("Promise2")
    resolve()
  })
  promise2.then(function () {
    console.log("resolved2")
  })

  console.log("Hi")

  //输出 Promise Promise2  Hi resolved resolved2
}

//下面是异步加载图片的例子。
if (0) {
  function loadImageAsync(url) {
    return new Promise(function (resolve, reject) {
      var image = new Image()

      image.onload = function () {
        resolve(image)
      }

      image.onerror = function () {
        reject(new Error("Could not load image at " + url))
      }

      image.src = url
    })
  }
}
//上面代码中，使用Promise包装了一个图片加载的异步操作。如果加载成功，就调用resolve方法，否则就调用reject方法。

//下面是一个用Promise对象实现的Ajax操作的例子。
if (0) {
  const getJSON = function (url) {
    var promise = new Promise(function (resolve, reject) {
      var client = new XMLHttpRequest()
      client.open("GET", url)
      client.onreadystatechange = handler
      client.responseType = "json"
      client.setRequestHeader("Accept", "application/json")
      client.send()

      function handler() {
        if (this.readyState !== 4) {
          return
        }
        if (this.status === 200) {
          resolve(this.response)
        } else {
          reject(new Error(this.statusText))
        }
      }
    })

    return promise
  }

  getJSON("/posts.json").then(
    function (json) {
      console.log("Contents: " + json)
    },
    function (error) {
      console.error("出错了", error)
    }
  )
}
//上面代码中，getJSON是对XMLHttpRequest对象的封装，用于发出一个针对JSON数据的HTTP请求，并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。

//如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个Promise实例，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作，比如像下面这样。
if (0) {
  const p1 = new Promise(function (resolve, reject) {
    // ...
  })

  const p2 = new Promise(function (resolve, reject) {
    // ...
    resolve(p1)
  })
}
//上面代码中，p1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

//注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是Pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是Resolved或者Rejected，那么p2的回调函数将会立刻执行。
if (1) {
  const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("fail")), 3000)
  })
  const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
  })

  p2.then((result) => console.log(result)).catch((error) => console.log(error))
}
//上面代码中，p1是一个Promise，3秒之后变为rejected。
//p2的状态在1秒之后改变，resolve方法返回的是p1。
//由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。
//所以，后面的then语句都变成针对后者（p1）。
//又过了2秒，p1变为rejected，导致触发catch方法指定的回调函数。