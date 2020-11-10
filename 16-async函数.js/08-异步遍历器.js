/**
异步遍历器
《遍历器》一章说过，Iterator 接口是一种数据遍历的协议，只要调用遍历器对象的next方法，就会得到一个对象，
表示当前遍历指针所在的那个位置的信息。next方法返回的对象的结构是{value, done}，其中value表示当前的数据的值，
done是一个布尔值，表示遍历是否结束。

这里隐含着一个规定，next方法必须是同步的，只要调用就必须立刻返回值。也就是说，一旦执行next方法，就必须同步地得到value和done这两个属性。
如果遍历指针正好指向同步操作，当然没有问题，但对于异步操作，就不太合适了。
目前的解决方法是，Generator 函数里面的异步操作，返回一个 Thunk 函数或者 Promise 对象，即value属性是一个 Thunk 函数或者 Promise 对象，
等待以后返回真正的值，而done属性则还是同步产生的。

目前，有一个提案，为异步操作提供原生的遍历器接口，即value和done这两个属性都是异步产生，这称为”异步遍历器“（Async Iterator）。
 */
//异步遍历的接口
// 异步遍历器的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象。
if (0) {
  asyncIterator.next().then(({ value, done }) => {
    /* ... */
  })
}
// 上面代码中，asyncIterator是一个异步遍历器，调用next方法以后，返回一个 Promise 对象。因此，可以使用then方法指定，
//这个 Promise 对象的状态变为resolve以后的回调函数。回调函数的参数，则是一个具有value和done两个属性的对象，这个跟同步遍历器是一样的。

// 我们知道，一个对象的同步遍历器的接口，部署在Symbol.iterator属性上面。同样地，对象的异步遍历器接口，
//部署在Symbol.asyncIterator属性上面。不管是什么样的对象，
//只要它的Symbol.asyncIterator属性有值，就表示应该对它进行异步遍历。

//下面是一个异步遍历器的例子。
if (0) {
  const asyncIterable = createAsyncIterable(["a", "b"])
  const asyncIterator = asyncIterable[Symbol.asyncIterator]()

  asyncIterator
    .next()
    .then((iterResult1) => {
      console.log(iterResult1) // { value: 'a', done: false }
      return asyncIterator.next()
    })
    .then((iterResult2) => {
      console.log(iterResult2) // { value: 'b', done: false }
      return asyncIterator.next()
    })
    .then((iterResult3) => {
      console.log(iterResult3) // { value: undefined, done: true }
    })
}
/**
  上面代码中，异步遍历器其实返回了两次值。第一次调用的时候，返回一个 Promise 对象；
  等到 Promise 对象resolve了，再返回一个表示当前数据成员信息的对象。这就是说，异步遍历器与同步遍历器最终行为是一致的，
  只是会先返回 Promise 对象，作为中介。

由于异步遍历器的next方法，返回的是一个 Promise 对象。因此，可以把它放在await命令后面。
 */
if (0) {
  async function f() {
    const asyncIterable = createAsyncIterable(["a", "b"])
    const asyncIterator = asyncIterable[Symbol.asyncIterator]()
    console.log(await asyncIterator.next())
    // { value: 'a', done: false }
    console.log(await asyncIterator.next())
    // { value: 'b', done: false }
    console.log(await asyncIterator.next())
    // { value: undefined, done: true }
  }
}
/**
  上面代码中，next方法用await处理以后，就不必使用then方法了。整个流程已经很接近同步处理了。
  
  注意，异步遍历器的next方法是可以连续调用的，不必等到上一步产生的Promise对象resolve以后再调用。
  这种情况下，next方法会累积起来，自动按照每一步的顺序运行下去。下面是一个例子，把所有的next方法放在Promise.all方法里面。
   */
if (0) {
  const asyncGenObj = createAsyncIterable(["a", "b"])
  const [{ value: v1 }, { value: v2 }] = await Promise.all([
    asyncGenObj.next(),
    asyncGenObj.next(),
  ])

  console.log(v1, v2) // a b
}

//另一种用法是一次性调用所有的next方法，然后await最后一步操作。
if (0) {
  const writer = openFile("someFile.txt")
  writer.next("hello")
  writer.next("world")
  await writer.return()
}
