//《数组的扩展》一章中，已经介绍过扩展运算符（...）。

const [a, ...b] = [1, 2, 3]
a // 1
b // [2, 3]

//（1）解构赋值
//对象的解构赋值用于从一个对象取值，相当于将所有可遍历的、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。
var { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
console.log(x) // 1
console.log(y) //2
console.log(z) //这里的z是个对象：{ a: 3, b: 4 }

if (0) {
  //由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
  var { x, y, ...z } = null // 运行时错误
  var { x, y, ...z } = undefined // 运行时错误

  //解构赋值必须是最后一个参数，否则会报错。
  // var { ...x, y, z } = obj; // 句法错误
  // var { x, ...y, ...z } = obj; // 句法错误
}
//上面代码中，解构赋值不是最后一个参数，所以会报错。
//注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

var obj = { a: { b: 1 } }
var { ...x } = obj
obj.a.b = 2
x.a.b // 2
//上面代码中，x是解构赋值所在的对象，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用。

//另外，解构赋值不会拷贝继承自原型对象的属性。
var o1 = { a: 1 }
var o2 = { b: 2 }
o2.__proto__ = o1
var o3 = { ...o2 }
o3 // { b: 2 }
//上面代码中，对象o3是o2的拷贝，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。

//解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。

function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用x和y参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig)
}
//上面代码中，原始函数baseFunction接受a和b作为参数，函数wrapperFunction在baseFunction的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为。

//扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
var z = { a: 3, b: 4 }
var n = { ...z }
n // { a: 3, b: 4 }

//这等同于使用Object.assign方法。

var aClone = { ...a }
// 等同于
var aClone = Object.assign({}, a)

//扩展运算符可以用于合并两个对象。

var ab = { ...a, ...b }
// 等同于
var ab = Object.assign({}, a, b)

//如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
var aWithOverrides = { ...a, x: 1, y: 2 }
// 等同于
var aWithOverrides = { ...a, ...{ x: 1, y: 2 } }
// 等同于
var x = 1,
  y = 2,
  aWithOverrides = { ...a, x, y }
// 等同于
var aWithOverrides = Object.assign({}, a, { x: 1, y: 2 })
//上面代码中，a对象的x属性和y属性，拷贝到新对象后会被覆盖掉。

//这用来修改现有对象部分的部分属性就很方便了。

previousVersion = {}
let newVersion = {
  ...previousVersion,
  name: "New Name", // Override the name property
}
//上面代码中，newVersion对象自定义了name属性，其他属性全部复制自previousVersion对象。

//如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。
var aWithDefaults = { x: 1, y: 2, ...a }
// 等同于
var aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a)
// 等同于
var aWithDefaults = Object.assign({ x: 1, y: 2 }, a)

//扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。
// 并不会抛出错误，因为x属性只是被定义，但没执行
let aWithXGetter = {
  ...a,
  get x() {
    throw new Error("not thrown yet")
  },
}

// 会抛出错误，因为x属性被执行了
let runtimeError = {
  ...a,
  ...{
    get x() {
      throw new Error("thrown now")
    },
  },
}
//如果扩展运算符的参数是null或undefined，这个两个值会被忽略，不会报错。

let emptyObject = { ...null, ...undefined } // 不报错

//如果扩展运算符的参数是null或undefined，这个两个值会被忽略，不会报错。

let emptyObject = { ...null, ...undefined } // 不报错
