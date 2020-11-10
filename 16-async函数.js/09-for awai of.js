/**
 for await...of
前面介绍过，for...of循环用于遍历同步的 Iterator 接口。新引入的for await...of循环，则是用于遍历异步的 Iterator 接口。
 */

if (0) {
  async function f() {
    for await (const x of createAsyncIterable(["a", "b"])) {
      console.log(x)
    }
  }
}
/**
    上面代码中，createAsyncIterable()返回一个异步遍历器，for...of循环自动调用这个遍历器的next方法，会得到一个Promise对象。
    await用来处理这个Promise对象，一旦resolve，就把得到的值（x）传入for...of的循环体。
    
    for await...of循环的一个用途，是部署了 asyncIterable 操作的异步接口，可以直接放入这个循环。
     */
//for await...of循环的一个用途，是部署了 asyncIterable 操作的异步接口，可以直接放入这个循环。
if (0) {
  let body = ""
  for await (const data of req) body += data
  const parsed = JSON.parse(body)
  console.log("got", parsed)
}

//注意，for await...of循环也可以用于同步遍历器。
if (0) {
  ;(async function () {
    for await (const x of ["a", "b"]) {
      console.log(x)
    }
  })()
  // a
  // b
}
