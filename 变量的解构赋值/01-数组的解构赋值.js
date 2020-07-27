//ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，
//这被称为解构（Destructuring）。

//以前
if (0) {
  let a = 1
  let b = 2
  let c = 3
}

//ES6 允许写成这样
if (0) {
  let [a, b, c] = [1, 2, 3]
  console.log(a, b, c)

  //上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。
}

/**
 * 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
 */

//下面是一些使用嵌套数组进行解构的例子。
if (0) {
  let [foo, [[bar], barz]] = [1, [[3], 3]]
  console.log(foo, bar, barz) //1 3 3

  let [, , third] = ["foo", "bar", "barz"]
  console.log(third) // barz

  let [x, , y] = [1, 2, 3]
  console.log(x, y) //1 3

  let [head, ...tail] = [1, 2, 3, 4]
  console.log(head) //1
  console.log(tail) // [ 2, 3, 4 ]

  let [x1, y1, ...z1] = ["a"]
  console.log(x1) //a
  console.log(y1) //undefined 如果解构不成功，变量的值就等于undefined。
  console.log(z1) //[] , 拓展变量结构为空数组

  let [foo1] = []
  console.log(foo1) //如果解构不成功，变量的值就等于undefined。

  let [bar1, foo2] = [1]
  console.log(foo2) //如果解构不成功，变量的值就等于undefined。
}

//另一种情况是不完全解构，即等号左边的模式，
//只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
if (0) {
  let [x, y] = [1, 2, 3]
  console.log(x, y) //1 2

  let [a, [b], d] = [1, [2, 3], 4]
  console.log(a, b, d) //1 2 4
}

//如果等号的右边不是数组
//（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
if (0) {
  // 报错
  let [foo1] = 1
  let [foo2] = false
  let [foo3] = NaN
  let [foo4] = undefined
  let [foo5] = null
  let [foo6] = {}

  /**
   * 上面的语句都会报错，因为等号右边的值，
   * 要么转为对象以后不具备 Iterator 接口（前五个表达式），
   * 要么本身就不具备 Iterator 接口（最后一个表达式）。
   */
}

//对于 Set 结构，也可以使用数组的解构赋值。
if (0) {
  let [x, y, z] = new Set(["a", "b", "c"])
  console.log(x) //a
  console.log(y) //b
  console.log(z) //c
}

//事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
if (0) {
  function* fibs() {
    let a = 0
    let b = 1
    while (true) {
      yield a
      ;[a, b] = [b, a + b]
    }
  }

  let [first, second, third, fourth, fifth, sixth] = fibs()
  console.log(first, second, third, fourth, fifth, sixth) //0 1 1 2 3 5  ...

  /**
   * 上面代码中，fibs是一个 Generator 函数（参见《Generator 函数》一章），
   * 原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
   * 
   * 其中：
        yield是ES6的新关键字，使生成器函数执行暂停，yield关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的版本的return关键字。
        yield关键字实际返回一个IteratorResult（迭代器）对象，它有两个属性，value和done，分别代表返回值和是否完成。
        yield无法单独工作，需要配合generator(生成器)的其他函数，如next，懒汉式操作，展现强大的主动控制特性。
   */
}

//解构赋值允许指定默认值。
if (0) {
  let [foo = true] = []
  console.log(foo)
  let [x, y = "b"] = ["a"]
  console.log(x, y) // a, b

  let [x1, y1 = "b"] = ["a", undefined]
  console.log(x1, y1) //a b

  //注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
  //所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。

  let [x3 = 1] = [undefined]
  console.log(x3) //1
  let [x4 = 1] = [null]
  console.log(x4) //null 默认值就不会生效，因为null不严格等于undefined。

  //如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
  function f() {
    console.log("aaa")
  }
  let [xn = f()] = [1]
  console.log(xn)
  //上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。
  if (0) {
    let x
    if ([1][0] === undefined) {
      x = f()
    } else {
      x = [1][0]
    }
  }

  //默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
  let [x5 = 1, y5 = x5] = [5]
  console.log(x5, y5) //5 5

  false &&
    (let[((x = y), (y = 1))] = []) // ReferenceError是因为x用到默认值y时，y还没有声明。
}
