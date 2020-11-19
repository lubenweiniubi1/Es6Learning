/**
生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript的原生构造函数大致有下面这些。

Boolean()
Number()
String()
Array()
Date()
Function()
RegExp()
Error()
Object()
以前，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。
 */
if (0) {
  function MyArray() {
    Array.apply(this, arguments)
  }

  MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
      value: MyArray,
      writable: true,
      configurable: true,
      enumerable: true,
    },
  })
}
//上面代码定义了一个继承Array的MyArray类。但是，这个类的行为与Array完全不一致
if (0) {
  var colors = new MyArray()
  colors[0] = 'red'
  console.log(colors.length) // 0

  colors.length = 0
  console.log(colors[0]) // "red"
}
//之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过Array.apply()或者分配给原型对象都不行。
//原生构造函数会忽略apply方法传入的this，也就是说，原生构造函数的this无法绑定，导致拿不到内部属性。

/**
ES5是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。
比如，Array构造函数有一个内部属性[[DefineOwnProperty]]，用来定义新属性时，更新length属性，
这个内部属性无法在子类获取，导致子类的length属性行为不正常。
 */

//下面的例子中，我们想让一个普通对象继承Error对象。
if (0) {
  const e = {}
  console.log(Object.getOwnPropertyNames(Error.call(e))) //[ 'stack' ]

  console.log(Object.getOwnPropertyNames(e)) //[]
}
//上面代码中，我们想通过Error.call(e)这种写法，让普通对象e具有Error对象的实例属性。
//但是，Error.call()完全忽略传入的第一个参数，而是返回一个新对象，e本身没有任何变化。这证明了Error.call(e)这种写法，无法继承原生构造函数。

/**
ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，
使得父类的所有行为都可以继承。下面是一个继承Array的例子。
 */
if (0) {
  class MyArray extends Array {
    constructor(...args) {
      super(...args)
    }
  }

  const arr = new MyArray()
  arr[0] = 12
  console.log(arr.length) //1

  arr.length = 0
  console.log(arr[0]) //undefined
}
//上面代码定义了一个MyArray类，继承了Array构造函数，因此就可以从MyArray生成数组的实例。
//这意味着，ES6可以自定义原生数据结构（比如Array、String等）的子类，这是ES5无法做到的。

//上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。
if (0) {
  class VersionedArray extends Array {
    constructor() {
      super()
      this.history = [[]]
    }
    commit() {
      this.history.push(this.slice())
    }
    revert() {
      this.splice(0, this.length, ...this.history[this.history.length - 1])
    }
  }
  var x = new VersionedArray()
  x.push(1)
  x.push(2)
  console.log(x) // [1, 2]
  console.log(x.history) // [[]]

  x.commit()
  x.history // [[], [1, 2]]
  x.push(3)
  x // [1, 2, 3]

  x.revert()
  x // [1, 2]
}
//上面代码中，VersionedArray结构会通过commit方法，将自己的当前状态存入history属性，然后通过revert方法，可以撤销当前版本，回到上一个版本。除此之外，VersionedArray依然是一个数组，所有原生的数组方法都可以在它上面调用。

//下面是一个自定义Error子类的例子。
if (0) {
  class ExtendableError extends Error {
    constructor(message) {
      super()
      this.message = message
      this.stack = new Error().stack
      this.name = this.constructor.name
    }
  }
  class MyError extends ExtendableError {
    constructor(m) {
      super(m)
    }
  }

  var myerror = new MyError('11')
  console.log(myerror.message) //11
  console.log(myerror instanceof Error) //true
  console.log(myerror.name) //MyError
  console.log(myerror.stack)

  /*
  Error
    at new ExtendableError (C:\Users\卢本伟牛批\Desktop\Es6Learning\17-class\11-原生构造函数的继承.js:114:20)
    at new MyError (C:\Users\卢本伟牛批\Desktop\Es6Learning\17-class\11-原生构造函数的继承.js:120:7)
    at Object.<anonymous> (C:\Users\卢本伟牛批\Desktop\Es6Learning\17-class\11-原生构造函数的继承.js:124:17)
    at Module._compile (internal/modules/cjs/loader.js:1200:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1220:10)
    at Module.load (internal/modules/cjs/loader.js:1049:32)
    at Function.Module._load (internal/modules/cjs/loader.js:937:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
    at internal/main/run_main_module.js:17:47
    */
}

//注意，继承Object的子类，有一个行为差异。
if (1) {
  class NewObj extends Object {
    constructor() {
      console.log(...arguments) //{ attr: true }

      super(...arguments)
    }
  }

  const o = new NewObj({ attr: true })
} 
//上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。
//这是因为ES6改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，
//ES6规定Object构造函数会忽略参数。