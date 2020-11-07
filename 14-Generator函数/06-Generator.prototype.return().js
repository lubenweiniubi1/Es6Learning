//Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。
if (0) {
  function* gen() {
    yield 1
    yield 2
    yield 3
  }
  const g = gen()

  console.log(g.next()) // { value: 1, done: false }
  console.log(g.return()) // { value: undefined, done: true }

  //   console.log(g.return('foo')) // { value: "foo", done: true }
  console.log(g.next()) // { value: undefined, done: true }
}
//上面代码中，遍历器对象g调用return方法后，返回值的value属性就是return方法的参数foo。
//并且，Generator函数的遍历就终止了，返回值的done属性为true，以后再调用next方法，done属性总是返回true。
//如果return方法调用时，不提供参数，则返回值的value属性为undefined。

//如果Generator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。

if (1) {
  function* numbers() {
    yield 1
    try {
      yield 2
      yield 3
    } catch (error) {
    } finally {
      yield 4
      yield 5
    }
  }
  const g = numbers()
  console.log(g.next())
  console.log(g.next())
  console.log(g.return(7))
  console.log(g.next())
  console.log(g.next())
  // { value: 1, done: false }
  // { value: 2, done: false }
  // { value: 4, done: false }
  // { value: 5, done: false }
  // { value: 7, done: true }
}
//上面代码中，调用return方法后，就开始执行finally代码块，然后等到finally代码块执行完，再执行return方法。