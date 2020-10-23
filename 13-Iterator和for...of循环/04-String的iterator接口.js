/**
 * 字符串的Iterator接口
字符串是一个类似数组的对象，也原生具有Iterator接口。
 */
if (0) {
  const str = "hi"
  const iterator = str[Symbol.iterator]()
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
}
// 上面代码中，调用Symbol.iterator方法返回一个遍历器对象，在这个遍历器上可以调用next方法，实现对于字符串的遍历。

// 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。
if (0) {
  var str = new String("hi")

  ;[...str] // ["h", "i"]

  str[Symbol.iterator] = function () {
    return {
      next: function () {
        if (this._first) {
          this._first = false
          return { value: "shit", done: false }
        } else {
          return { done: true }
        }
      },
      _first: true,
    }
  }
  console.log(...str) // ["bye"]
  console.log(str) // "hi"
  //上面代码中，字符串str的Symbol.iterator方法被修改了，所以扩展运算符（...）返回的值变成了bye，而字符串本身还是hi。
}

//Symbol.iterator方法的最简单实现，还是使用下一章要介绍的Generator函数。
if (1) {
  const myIterable = {}
  myIterable[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
  }
  console.log(...myIterable)

  // 或者采用下面的简洁写法
  let obj = {
    *[Symbol.iterator]() {
      yield "hello"
      yield "world"
    },
  }
  for (let x of obj) {
    console.log(x)
  }
  //上面代码中，Symbol.iterator方法几乎不用部署任何代码，只要用yield命令给出每一步的返回值即可。
}
