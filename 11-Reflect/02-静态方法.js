/**
 * Reflect对象一共有13个静态方法。

    Reflect.apply(target,thisArg,args)
    Reflect.construct(target,args)
    Reflect.get(target,name,receiver)
    Reflect.set(target,name,value,receiver)
    Reflect.defineProperty(target,name,desc)
    Reflect.deleteProperty(target,name)
    Reflect.has(target,name)
    Reflect.ownKeys(target)
    Reflect.isExtensible(target)
    Reflect.preventExtensions(target)
    Reflect.getOwnPropertyDescriptor(target, name)
    Reflect.getPrototypeOf(target)
    Reflect.setPrototypeOf(target, prototype)
上面这些方法的作用，大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。下面是对它们的解释。
 */

// Reflect.get(target, name, receiver)
// Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  },
}

console.log(Reflect.get(myObject, "foo")) // 1
Reflect.get(myObject, "bar") // 2
console.log(Reflect.get(myObject, "baz")) // 3
// 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。

var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  },
}

var myReceiverObject = {
  foo: 4,
  bar: 4,
}

console.log(Reflect.get(myObject, "baz", myReceiverObject)) // 8
// 如果第一个参数不是对象，Reflect.get方法会报错。
if (0) {
  Reflect.get(1, "foo") // 报错
  Reflect.get(false, "foo") // 报错
}

//Reflect.set(target, name, value, receiver)
// Reflect.set方法设置target对象的name属性等于value。
var myObject = {
  foo: 1,
  set bar(value) {
    return (this.foo = value)
  },
}

myObject.foo // 1

Reflect.set(myObject, "foo", 2)
console.log(myObject.foo) // 2

Reflect.set(myObject, "bar", 3)
console.log(myObject.foo) // 3
console.log(myObject.bar) //undefined
// 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。

var myObject = {
  foo: 4,
  set bar(value) {
    return (this.foo = value)
  },
}

var myReceiverObject = {
  foo: 0,
}

Reflect.set(myObject, "bar", 1, myReceiverObject)
myObject.foo // 4
myReceiverObject.foo // 1
// 如果第一个参数不是对象，Reflect.set会报错。

if (0) {
  Reflect.set(1, "foo", {}) // 报错
  Reflect.set(false, "foo", {}) // 报错
}
// 注意，Reflect.set会触发Proxy.defineProperty拦截。
if (0) {
  let p = {
    a: "a",
  }

  let handler = {
    set(target, key, value, receiver) {
      console.log("set")
      Reflect.set(target, key, value, receiver)
    },
    defineProperty(target, key, attribute) {
      console.log("defineProperty")
      Reflect.defineProperty(target, key, attribute)
    },
  }

  let obj = new Proxy(p, handler)
  obj.a = "A"
  // set
  // defineProperty
  // 上面代码中，Proxy.set拦截中使用了Reflect.set，导致触发Proxy.defineProperty拦截。
}

//Reflect.has(obj, name)
// Reflect.has方法对应name in obj里面的in运算符。
var myObject = {
  foo: 1,
}

// 旧写法
"foo" in myObject // true

// 新写法
Reflect.has(myObject, "foo") // true
// 如果第一个参数不是对象，Reflect.has和in运算符都会报错。

//Reflect.deleteProperty(obj, name)
// Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
const myObj = { foo: "bar" }

// 旧写法
delete myObj.foo

// 新写法
Reflect.deleteProperty(myObject, "foo")

//Reflect.construct(target, args)
// Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
if (0) {
  function Greeting(name) {
    this.name = name
  }
  //new 的写法
  const instance = new Greeting("张三")

  console.log("construct")
  //Reflect.construct写法
  const ins = Reflect.construct(Greeting, ["name"])
}

//Reflect.getPrototypeOf(obj)
// Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
if (0) {
  function FancyThing() {}
  const myObj = new FancyThing()

  // 旧写法
  Object.getPrototypeOf(myObj) === FancyThing.prototype

  // 新写法
  Reflect.getPrototypeOf(myObj) === FancyThing.prototype
  // Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。

  Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}
  0 && Reflect.getPrototypeOf(1) // 报错
}

//Reflect.setPrototypeOf(obj, newProto)
// Reflect.setPrototypeOf方法用于设置对象的__proto__属性，返回第一个参数对象，对应Object.setPrototypeOf(obj, newProto)。
if (0) {
  function FancyThing() {}
  const OtherThing = Object.create({})
  const myObj = new FancyThing()
  console.log(Reflect.getPrototypeOf(OtherThing))

  // 旧写法
  Object.setPrototypeOf(myObj, Reflect.getPrototypeOf(OtherThing))

  // 新写法
  Reflect.setPrototypeOf(myObj, Reflect.getPrototypeOf(OtherThing))
  // 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。

  Object.setPrototypeOf(1, {})
  // 1

  Reflect.setPrototypeOf(1, {})
  // TypeError: Reflect.setPrototypeOf called on non-object

  // 如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。
  Object.setPrototypeOf(null, {})
  // TypeError: Object.setPrototypeOf called on null or undefined

  Reflect.setPrototypeOf(null, {})
  // TypeError: Reflect.setPrototypeOf called on non-object
}

// Reflect.apply(func, thisArg, args)
// Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。

// 一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。
if (0) {
  const ages = [11, 33, 12, 54, 18, 96]

  // 旧写法
  var youngest = Math.min.apply(Math, ages)
  var oldest = Math.max.apply(Math, ages)
  var type = Object.prototype.toString.call(youngest)

  // 新写法
  var youngest = Reflect.apply(Math.min, Math, ages)
  var oldest = Reflect.apply(Math.max, Math, ages)
  var type = Reflect.apply(Object.prototype.toString, youngest, [])
}

// Reflect.defineProperty(target, propertyKey, attributes)
// Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。
//未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。
if (0) {
  function MyDate() {
    /*…*/
  }

  // 旧写法
  Object.defineProperty(MyDate, "now", {
    value: () => new Date.now(),
  })

  // 新写法
  Reflect.defineProperty(MyDate, "now", {
    value: () => new Date.now(),
  })
  // 如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误，比如Reflect.defineProperty(1, 'foo')。
}
