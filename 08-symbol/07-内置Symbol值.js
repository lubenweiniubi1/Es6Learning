//除了定义自己使用的Symbol值以外，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法。
//Symbol.hasInstance
//对象的Symbol.hasInstance属性，指向一个内部方法。
//当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
//比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)
class MyClass {
  [Symbol.hasInstance](foo) {
    console.log("撒比")
    return foo instanceof Array
  }
}
console.log([1, 2, 3] instanceof new MyClass()) //true
console.log([1, 2, 3] instanceof MyClass) //false ,加上static就是true 了
//上面代码中，MyClass是一个类，new MyClass()会返回一个实例。
//该实例的Symbol.hasInstance方法，会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例。
console.log(Object.getOwnPropertySymbols(Array))

class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0
  }
}

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false

//Symbol.isConcatSpreadable
//对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象使用Array.prototype.concat()时，是否可以展开。
var arr1 = ["c", "d"]
console.log(["a", "b"].concat(arr1, "e")) //[ 'a', 'b', 'c', 'd', 'e' ]
console.log(arr1[Symbol.isConcatSpreadable]) //undefined

var arr2 = ["c", "d"]
arr2[Symbol.isConcatSpreadable] = false
console.log(["a", "b"].concat(arr2, "e"))
/**
 * [
  'a',
  'b',
  [ 'c', 'd', [Symbol(Symbol.isConcatSpreadable)]: false ],
  'e'
]
 */
//上面代码说明，数组的默认行为是可以展开。Symbol.isConcatSpreadable属性等于true或undefined，都有这个效果。

//类似数组的对象也可以展开，但它的Symbol.isConcatSpreadable属性默认为false，必须手动打开。
var obj = { length: 2, 0: "c", 1: "d" }
console.log(["a", "b"].concat(obj, "e")) //[ 'a', 'b', { '0': 'c', '1': 'd', length: 2 }, 'e' ]
obj[Symbol.isConcatSpreadable] = true
console.log(["a", "b"].concat(obj, "e")) //[ 'a', 'b', 'c', 'd', 'e' ]

//对于一个类来说，Symbol.isConcatSpreadable属性必须写成实例的属性。

class A1 extends Array {
  constructor(args) {
    super(args)
    this[Symbol.isConcatSpreadable] = true
  }
}
class A2 extends Array {
  constructor(args) {
    super(args)
    this[Symbol.isConcatSpreadable] = false //默认可展开
  }
}
let a1 = new A1()
a1[0] = 3
a1[1] = 4
let a2 = new A2()
a2[0] = 5
a2[1] = 6

console.log([1, 2].concat(a1).concat(a2))
// [1, 2, 3, 4, [5, 6]]
//上面代码中，类A1是可展开的，类A2是不可展开的，所以使用concat时有不一样的结果。

//其他的不想看了，遇到了再查吧

/**
 * Symbol.iterator
对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
*/

var myIterable = {}
myIterable[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
}

;[...myIterable] // [1, 2, 3]
//对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器，详细介绍参见《Iterator和for...of循环》一章。

class Collection {
  *[Symbol.iterator]() {
    console.log("撒比")
    let i = 0
    while (this[i] !== undefined) {
      yield this[i]
      ++i
    }
  }
}

let myCollection = new Collection()
myCollection[0] = 1
myCollection[1] = 2

for (let value of myCollection) {
  console.log(value)
}
// 1
// 2

//