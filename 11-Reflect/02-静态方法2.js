//Reflect.getOwnPropertyDescriptor(target, propertyKey)
// Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。
if (0) {
  var myObject = {}
  Object.defineProperty(myObject, "hidden", {
    value: true,
    enumerable: false,
  })

  // 旧写法
  var theDescriptor = Object.getOwnPropertyDescriptor(myObject, "hidden")

  // 新写法
  var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, "hidden")
  // Reflect.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptor的一个区别是，如果第一个参数不是对象，Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，表示参数非法。
}

// Reflect.isExtensible (target)
// Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
if (0) {
  const myObject = {}

  // 旧写法
  Object.isExtensible(myObject) // true

  // 新写法
  Reflect.isExtensible(myObject) // true
  // 如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。

  Object.isExtensible(1) // false
  Reflect.isExtensible(1) // 报错
}

//Reflect.preventExtensions(target)
// Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
if (0) {
  var myObject = {}

  // 旧写法
  Object.isExtensible(myObject) // true

  // 新写法
  Reflect.preventExtensions(myObject) // true
  // 如果参数不是对象，Object.isExtensible在 ES5 环境报错，在 ES6 环境返回这个参数，而Reflect.preventExtensions会报错。

  // ES5
  Object.preventExtensions(1) // 报错

  // ES6
  Object.preventExtensions(1) // 1

  // 新写法
  Reflect.preventExtensions(1) // 报错
}

//Reflect.ownKeys (target)
// Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
if (1) {
  var myObject = {
    foo: 1,
    bar: 2,
    [Symbol.for("baz")]: 3,
    [Symbol.for("bing")]: 4,
  }

  // 旧写法
  Object.getOwnPropertyNames(myObject)
  // ['foo', 'bar']

  Object.getOwnPropertySymbols(myObject)
  //[Symbol.for('baz'), Symbol.for('bing')]

  // 新写法
  Reflect.ownKeys(myObject)
  // ['foo', 'bar', Symbol.for('baz'), Symbol.for('bing')]
}
