//解构不仅可以用于数组，还可以用于对象。
if (0) {
  let { foo, bar } = { foo: "Im", bar: "bigSB" }
  console.log(foo, bar) //Im bigSb
}

/**
 * 对象的解构与数组有一个重要的不同。
 * 数组的元素是按次序排列的，变量的取值由它的位置决定；
 * 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
 */
if (0) {
  let { bar, foo } = { foo: "aaa", bar: "bbb" }
  console.log(foo, bar) //这里次序不影响

  let { baz } = { foo: "aaa", bar: "bbb" }
  console.log(baz) //undefined，这里必须要和对应的属性重名

  //如果变量名与属性名不一致，必须写成下面这样。
  let { foo: variable1 } = { foo: "aa1a", bar: "bbb" }
  console.log(variable1) //aa1a

  let obj = { first: "hello", last: "world" }
  let { first: f, last: l } = obj
  console.log(f, l) //hello world

  //这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）
  if (0) {
    let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" }
  }

  /**
   * 也就是说，对象的解构赋值的内部机制，是先找到同名属性，
   * 然后再赋给对应的变量。
   * 真正被赋值的是后者，而不是前者。
   */

  let { foo7: barzs } = { foo7: "aaa7", bar: "bbb" }
  console.log(barzs) //aaa
  0 && console.log(foo7) //foo7 is not defined
  //上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo7。
}

if (0) {
  //注意，采用这种写法时，变量的声明和赋值是一体的。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。
  let foo
  // let { foo } = { foo: 1 } //SyntaxError: Identifier 'foo' has already been declared
}
//正确写法
if (0) {
  let foo
  ;({ foo } = { foo: 123 }) //成功
  //上面代码中，let命令下面一行的圆括号是必须的，否则会报错。
  //因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。
}

// 和数组一样，解构也可以用于嵌套结构的对象。
if (0) {
  let obj = {
    p: ["hello", { y: "World" }],
  }
  let {
    p: [x, { y }],
  } = obj
  console.log(x, y)
  //注意，这时p是模式，不是变量，因此不会被赋值
}
//同上面那个例子
if (0) {
  const node1 = {
    loc: {
      start: {
        line: 1,
        column: 5,
      },
    },
  }
  const {
    loc: {
      start: { line },
    },
  } = node1
  console.log(loc) //loc is not defined
  console.log(start) //start is not defined

  //上面代码中，只有line是变量，loc和start都是模式，不会被赋值。
}

//嵌套赋值的例子
if (0) {
  let obj = {}
  let arr = []
  ;({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true })
  console.log(obj) //{ prop: 123 }
  console.log(arr) //[ true ]
}

//对象的解构也可以指定默认值。
if (0) {
  var { x = 3 } = {}
  console.log(x) //3
  var { x, y = 5 } = { x: 1 }
  console.log(x, y) //1 5
  var { x: y = 5 } = {}
  console.log(y) //5

  var { x: y = 3 } = { x: 888 }
  console.log(y) //888

  var { message: msg = "Something went wrong" } = {}
  console.log(msg)
}

// 默认值生效的条件是，对象的属性值严格等于undefined。
if (0) {
  var { x = 3 } = { x: undefined }
  console.log(x) //3
  var { x = 3 } = { x: null }
  console.log(x) //null
}

//如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
if (0) {
  if (0) {
    let {
      foo: { bar },
    } = { baz: "baz" } //Cannot read property 'bar' of undefined
    console.log(bar)
    //上面代码中，等号左边对象的foo属性，对应一个子对象。
    //该子对象的bar属性，解构时会报错。原因很简单，因为foo这时等于undefined，再取子属性就会报错，请看下面的代码。
  }
  if (0) {
    let _tmp = { baz: "baz" }
    _tmp.foo.bar // 报错
  }

  if (0) {
    let { foo: bar } = { baz: "baz" }
    console.log(bar) //undefined
  }
  //也就是说不能解构undefined
  if (0) {
    let { foo } = undefined //Cannot destructure property 'foo' of 'undefined' as it is undefined.
    console.log(foo)
  }
}

//如果要将一个已经声明的变量用于解构赋值，必须非常小心。
if (0) {
  let x
    //错误写法
    // {x} = {x:3}

    //正解
  ;({ x } = { x: 1 })
  console.log(x)
}
/**
 * 上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。关于圆括号与解构赋值的关系，参见下文。
 */

//解构赋值允许，等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
if (0) {
  ;({} = [true, false])
  ;({} = "abc")
  ;({} = [])
  //上面的表达式虽然毫无意义，但是语法是合法的，可以执行。
}

//对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
if (0) {
  let { sin, cos, log } = Math
  console.log(sin(Math.PI))
}

//由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
if (0) {
  let arr = [1111, 2, 3]
  let { 0: first ,[arr.length - 1] : last} = arr
  console.log(first)
  console.log(last)
  //上面代码对数组进行对象解构。数组arr的0键对应的值是1，[arr.length - 1]就是2键，对应的值是3。方括号这种写法，属于“属性名表达式”，参见《对象的扩展》一章。
}
