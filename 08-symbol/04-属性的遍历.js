//Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，
//也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
//但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。

//Object.getOwnPropertySymbols方法返回一个数组，
//成员是当前对象的所有用作属性名的 Symbol 值。
var obj = {}
var a = Symbol("a")
var b = Symbol("b")

obj[a] = "Hello"
obj[b] = "World"

console.log(Object.keys(obj)) //[]
console.log(Object.values(obj)) //[]
console.log(Object.getOwnPropertyNames(obj)) //[]
console.log(JSON.stringify(obj)) //{}

var objSyms = Object.getOwnPropertySymbols(obj)
console.log(obj) //{ [Symbol(a)]: 'Hello', [Symbol(b)]: 'World' }
console.log(objSyms) //[ Symbol(a), Symbol(b) ]
console.log(obj[objSyms[0]]) //hello

var obj = {}
var foo = Symbol("foo")

Object.defineProperty(obj, foo, {
  value: "foobar",
})

for (var i in obj) {
  console.log("31", i) // 无输出
}

console.log(Object.getOwnPropertyNames(obj)) // []

console.log(Object.getOwnPropertySymbols(obj)) // [Symbol(foo)]

//上面代码中，使用Object.getOwnPropertyNames方法得不到Symbol属性名，需要使用Object.getOwnPropertySymbols方法。

//另一个新的API，Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
var obj = {
  [Symbol("my_key")]: 1,
  enum: 2,
  nonEnum: 3,
}
console.log(Reflect.ownKeys(obj)) //[ 'enum', 'nonEnum', Symbol(my_key) ]

//由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
var size = Symbol("size")
class Collection {
  constructor() {
    this[size] = 0
  }

  add(item) {
    this[this[size]] = item
    this[size]++
  }
  static sizeOf(instance) {
    return instance[size]
  }
}

var x = new Collection()
console.log(Collection.sizeOf(x))
x.add("foo")
console.log(Collection.sizeOf(x))

console.log(Object.keys(x)) //['0']
console.log(Object.getOwnPropertyNames(x)) //['0']
console.log(Object.getOwnPropertySymbols(x)) //[ Symbol(size) ]
//上面代码中，对象x的size属性是一个 Symbol 值，所以Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它。这就造成了一种非私有的内部方法的效果。

