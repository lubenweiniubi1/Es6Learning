//Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。
/**
 * var p = Promise.all([p1, p2, p3]);
 * 上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise对象的实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。
 * （Promise.all方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。）

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
 */

//下面是一个具体的例子。
if (1) {
  const promises = [2, 3, 5, 7, 11, 13].map((id) => {
    return new Promise(function (resolve, reject) {
      resolve(id)
    })
  })
  Promise.all(promises)
    .then(function (pros) {
      console.log(pros) //[ 2, 3, 5, 7, 11, 13 ]
    })
    .catch(function (reason) {
      console.log(reason)
    })
}
//上面代码中，promises是包含6个Promise实例的数组，只有这6个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。

//另外一个例子
if (0) {
  const databasePromise = connectDatabase()

  const booksPromise = databasePromise.then(findAllBooks)

  const userPromise = databasePromise.then(getCurrentUser)

  Promise.all([booksPromise, userPromise]).then(([books, user]) =>
    pickTopRecommentations(books, user)
  )
}
//上面代码中，booksPromise和userPromise是两个异步操作，只有等到它们的结果都返回了，才会触发pickTopRecommentations这个回调函数。
