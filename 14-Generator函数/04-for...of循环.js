//for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。
if (0) {
  function* foo() {
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5
    return 6
  }

  for (let v of foo()) {
    console.log(v)
  }
}
//上面代码使用for...of循环，依次显示5个yield语句的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。

//下面是一个利用Generator函数和for...of循环，实现斐波那契数列的例子。
if (0) {
  function* fibonacci() {
    let [pre, cur] = [0, 1]
    for (;;) {
      yield pre
      ;[pre, cur] = [cur, pre + cur]
    }
  }

  for (let n of fibonacci()) {
    if (n > 10) break
    console.log(n)
  }
}
//从上面代码可见，使用for...of语句时不需要使用next方法。

//利用for...of循环，可以写出遍历任意对象（object）的方法。原生的JavaScript对象没有遍历接口，无法使用for...of循环，通过Generator函数为它加上这个接口，就可以用了。
if (0) {
  function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj)
    for (let key of propKeys) {
      yield [key, obj[key]]
    }
  }

  let jane = { first: 'Jane', last: 'Deo' }

  for (let item of objectEntries(jane)) {
    console.log(item)
  }
}
//上面代码中，对象jane原生不具备Iterator接口，无法用for...of遍历。这时，我们通过Generator函数objectEntries为它加上遍历器接口，就可以用for...of遍历了。
//加上遍历器接口的另一种写法是，将Generator函数加到对象的Symbol.iterator属性上面。
if (0) {
  function* objectEntries() {
    // let propKeys = Reflect.ownKeys(this)//这个回返回symbol属性
    let propKeys = Object.keys(this)
    for (let propKey of propKeys) {
      yield [propKey, this[propKey]]
    }
  }
  let jane = { first: 'Jane', last: 'Deo' }
  jane[Symbol.iterator] = objectEntries

  for (let [key, value] of jane) {
    console.log(`${key}: ${value}`)
  }
}

//除了for...of循环以外，扩展运算符（...）、解构赋值  和Array.from方法内部调用的，都是遍历器接口。
//这意味着，它们都可以将Generator函数返回的Iterator对象，作为参数。
if (1) {
  function* numbers() {
    yield 1
    yield 2
    return 3
    yield 4
  }

  console.log(...numbers()) // 1 2
  console.log(Array.from(numbers())) //[ 1 2]

  let [x, y] = numbers()
  console.log(x, y) // 1 2
  
  // for...of 循环
  for (let n of numbers()) {
    console.log(n)
  }
  // 1
  // 2
}
