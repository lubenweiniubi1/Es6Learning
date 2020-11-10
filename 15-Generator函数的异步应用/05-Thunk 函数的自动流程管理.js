/*
Thunk 函数的自动流程管理

Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器。
*/
function run(fun) {
  const gen = fun()

  function next(err, data) {
    const result = gen.next(data)
    if (result.done) {
      return
    }
    result.value(next)
  }

  next()
}

function* g() {
  //...
}
run(g)
/**
上面代码的run函数，就是一个 Generator 函数的自动执行器。内部的next函数就是 Thunk 的回调函数。
next函数先将指针移到 Generator 函数的下一步（gen.next方法），然后判断 Generator 函数是否结束（result.done属性），如果没结束，
就将next函数再传入 Thunk 函数（result.value属性），否则就直接退出。

有了这个执行器，执行 Generator 函数方便多了。不管内部有多少个异步操作，直接把 Generator 函数传入run函数即可。
当然，前提是每一个异步操作，都要是 Thunk 函数，也就是说，跟在yield命令后面的必须是 Thunk 函数。
 */

const g2 = function* () {
  var f1 = yield readFile('fileA')
  var f2 = yield readFile('fileB')
  // ...
  var fn = yield readFile('fileN')
}
/**
上面代码中，函数g封装了n个异步的读取文件操作，只要执行run函数，这些操作就会自动完成。
这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。

Thunk 函数并不是 Generator 函数自动执行的唯一方案。因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，
接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象也可以做到这一点。
 */