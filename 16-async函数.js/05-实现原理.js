//async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
if (0) {
  async function fn(args) {
    // ...
  }

  // 等同于

  function fn(args) {
    return spawn(function* () {
      // ...
    })
  }
}
//所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。

// 下面给出spawn函数的实现，基本就是前文自动执行器的翻版。
if (0) {
  function spawn(genF) {
    return new Promise(function (resolve, reject) {
      var gen = genF()
      function step(nextF) {
        try {
          var next = nextF()
        } catch (e) {
          return reject(e)
        }
        if (next.done) {
          return resolve(next.value)
        }
        Promise.resolve(next.value).then(
          function (v) {
            step(function () {
              return gen.next(v)
            })
          },
          function (e) {
            step(function () {
              return gen.throw(e)
            })
          }
        )
      }

      step(function () {
        return gen.next(undefined)
      })
    })
  }
}
