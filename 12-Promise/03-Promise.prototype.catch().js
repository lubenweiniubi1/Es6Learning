/*
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
*/
if (0) {
  getJSON("/post.json")
    .then(function (posts) {
      //...
    })
    .catch(function (err) {
      //...发生错误
    })
}
//上面代码中，getJSON方法返回一个 Promise 对象，如果该对象状态变为Resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为Rejected，就会调用catch方法指定的回调函数，处理这个错误。另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。
if (0) {
  p.then((val) => console.log("fulfilled:", val)).catch((err) =>
    console.log("rejected", err)
  )

  // 等同于
  p.then((val) => console.log("fulfilled:", val)).then(null, (err) =>
    console.log("rejected:", err)
  )
}

//下面是个例子
if (0) {
  const promise = new Promise(function (resolve, reject) {
    throw new Error("test")
  })

  promise.catch(function (err) {
    console.log(err) //不log就没反应
  }) // Error: test
}
//上面代码中，promise抛出一个错误，就被catch方法指定的回调函数捕获。注意，上面的写法与下面两种写法是等价的。
if (0) {
  // 写法一
  var promise = new Promise(function (resolve, reject) {
    try {
      throw new Error("test")
    } catch (e) {
      reject(e)
    }
  })
  promise.catch(function (error) {
    console.log(error)
  })

  // 写法二
  var promise = new Promise(function (resolve, reject) {
    reject(new Error("test"))
  })
  promise.catch(function (error) {
    console.log(error)
  })
}
//比较上面两种写法，可以发现reject方法的作用，等同于抛出错误。

//如果Promise状态已经变成Resolved，再抛出错误是无效的。
if (0) {
  const promise = new Promise(function (resolve, reject) {
    resolve("ok")
    throw new Error("test")
  })

  promise
    .then(function (value) {
      console.log(value)
    })
    .catch(function (error) {
      console.log(error)
    })
}
//上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

//Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
if (0) {
  getJSON("/post/1.json")
    .then(function (post) {
      return getJSON(post.commentURL)
    })
    .then(function (comments) {
      // some code
    })
    .catch(function (error) {
      // 处理前面三个Promise产生的错误
    })
}
//上面代码中，一共有三个Promise对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。

//一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。
//重要！
if (0) {
  //bad
  promise.then(
    function (data) {
      //success
    },
    (err) => {
      //error
    }
  )

  //good
  promise
    .then(function (data) {
      //success
    })
    .catch(function (err) {
      //erro
    })
}
//上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。
//因此，建议总是使用catch方法，而不使用then方法的第二个参数。

//跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。
if (0) {
  const someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
      //下面一行会报错，因为x没有生命
      resolve(x + 2)
    })
  }
  //(node:10300) UnhandledPromiseRejectionWarning: ReferenceError: x is not defined

  someAsyncThing().then(function () {
    console.log("everything is great")
  })
}
//上面代码中，someAsyncThing函数产生的Promise对象会报错，但是由于没有指定catch方法，这个错误不会被捕获，也不会传递到外层代码，导致运行后没有任何输出。注意，Chrome浏览器不遵守这条规定，它会抛出错误“ReferenceError: x is not defined”。

if (0) {
  const promise = new Promise((resolve, reject) => {
    resolve("ok")
    setTimeout(function () {
      throw new Error("test1")
    })
  })
  promise.then((value) => console.log(value))
}
//上面代码中，Promise 指定在下一轮“事件循环”再抛出错误，结果由于没有指定使用try...catch语句，
//就冒泡到最外层，成了未捕获的错误。
//因为此时，Promise的函数体已经运行结束了，所以这个错误是在Promise函数体外抛出的。

//Node 有一个unhandledRejection事件，专门监听未捕获的reject错误。
if (0) {
  const someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
      //下面一行会报错，因为x没有生命
      resolve(x + 2)
    })
  }
  someAsyncThing().then((a) => console.log(a))
  process.on("unhandledRejection", function (err, p) {
    console.log(111)
    console.error(err.stack, p)
  })
}
//上面代码中，unhandledRejection事件的监听函数有两个参数，第一个是错误对象，第二个是报错的Promise实例，它可以用来了解发生错误的环境信息。。

//需要注意的是，catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法
if (0) {
  const sb = function () {
    return new Promise(function (resolve, reject) {
      resolve(x + 2) //会报错
    })
  }

  sb()
    .catch((err) => console.log("oh no", err))
    .then(function () {
      console.log("carry on")
    })
}
//上面代码运行完catch方法指定的回调函数，会接着运行后面那个then方法指定的回调函数。如果没有报错，则会跳过catch方法。
if (1) {
  Promise.resolve()
    .catch(function (error) {
      console.log("oh no", error)
    })
    .then(function () {
      console.log("carry on")
    })
  // carry on
}
//上面的代码因为没有报错，跳过了catch方法，直接执行后面的then方法。
//此时，要是then方法里面报错，就与前面的catch无关了。

//catch方法之中，还能再抛出错误。

if (1) {
  const someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
      // 下面一行会报错，因为x没有声明
      resolve(x + 2)
    })
  }
  someAsyncThing()
    .then(function () {
      return someAsyncThing()
    })
    .catch(function (err) {
      // console.log(err)
      //下面一行会报错，因为y没有声明
      y + 1
    })
    .then(function () {
      console.log("carry on")
    })
    // .catch((err) => {
    //   console.log("你妈死了")
    // })
}
//上面代码中，catch方法抛出一个错误，因为后面没有别的catch方法了，导致这个错误不会被捕获，也不会传递到外层。如果改写一下，结果就不一样了。
