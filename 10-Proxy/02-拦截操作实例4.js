// getOwnPropertyDescriptor()
// getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。

var handler = {
  getOwnPropertyDescriptor(target, key) {
    if (key[0] === "_") {
      return
    }
    return Object.getOwnPropertyDescriptor(target, key)
  },
}
var target = { _foo: "bar", baz: "tar" }
var proxy = new Proxy(target, handler)
console.log(Object.getOwnPropertyDescriptor(proxy, "wat"))
// undefined
console.log(Object.getOwnPropertyDescriptor(proxy, "_foo"))
// undefined
console.log(Object.getOwnPropertyDescriptor(proxy, "baz"))
// { value: 'tar', writable: true, enumerable: true, configurable: true }
// 上面代码中，handler.getOwnPropertyDescriptor方法对于第一个字符为下划线的属性名会返回undefined。

//getPrototypeOf()
// getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof
// 下面是一个例子。

var proto = {}
var p = new Proxy(
  {},
  {
    getPrototypeOf(target) {
      return proto
    },
  }
)
Object.getPrototypeOf(p) === proto // true
// 上面代码中，getPrototypeOf方法拦截Object.getPrototypeOf()，返回proto对象。

// 注意，getPrototypeOf方法的返回值必须是对象或者null，否则报错。另外，如果目标对象不可扩展（extensible）， getPrototypeOf方法必须返回目标对象的原型对象。

// isExtensible()
// isExtensible方法拦截Object.isExtensible操作。
var p = new Proxy(
  {},
  {
    isExtensible: function (target) {
      console.log("called")
      return true
    },
  }
)

Object.isExtensible(p)
// "called"
// true
// 上面代码设置了isExtensible方法，在调用Object.isExtensible时会输出called。

// 注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。

// 这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。

console.log(Object.isExtensible(proxy) === Object.isExtensible(target))
// 下面是一个例子。

var p = new Proxy(
  {},
  {
    isExtensible: function (target) {
      return false
    },
  }
)

// Object.isExtensible(p) // 报错

//ownKeys()
// ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys()
// 下面是拦截Object.keys()的例子。
if (1) {
  let target = {
    a: 1,
    b: 2,
    c: 3,
  }

  let handler = {
    ownKeys(target) {
      return ["a"]
    },
  }

  let proxy = new Proxy(target, handler)

  Object.keys(proxy)
}
// [ 'a' ]
// 上面代码拦截了对于target对象的Object.keys()操作，只返回a、b、c三个属性之中的a属性。

// 下面的例子是拦截第一个字符为下划线的属性名。
if (0) {
  let target = {
    _bar: "foo",
    _prop: "bar",
    prop: "baz",
  }

  let handler = {
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key[0] !== "_")
    },
  }

  let proxy = new Proxy(target, handler)
  for (let key of Object.keys(proxy)) {
    console.log(target[key])
  }
  // "baz"
}

//注意，使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回。
// 目标对象上不存在的属性
// 属性名为 Symbol 值
// 不可遍历（enumerable）的属性
if (1) {
  let target = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.for("secret")]: "4",
  }

  Object.defineProperty(target, "key", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: "static",
  })

  let handler = {
    ownKeys(target) {
      return ["a", "d", Symbol.for("secret"), "key"]
    },
  }

  let proxy = new Proxy(target, handler)

  console.log(Object.keys(proxy))
  // ['a']
}
//上面代码中，ownKeys方法之中，显式返回不存在的属性（d）、Symbol 值（Symbol.for('secret')）、不可遍历的属性（key），结果都被自动过滤掉。

//ownKeys方法还可以拦截Object.getOwnPropertyNames()。
if (1) {
  const p = new Proxy(
    {},
    {
      ownKeys: function (target) {
        return ["a", "b", "c"]
      },
    }
  )

  console.log(Object.getOwnPropertyNames(p))
  // [ 'a', 'b', 'c' ]
}

//ownKeys方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。
if (0) {
  const obj = {}

  const p = new Proxy(obj, {
    ownKeys: function (target) {
      return [123, true, undefined, null, {}, []]
    },
  })

  Object.getOwnPropertyNames(p) //TypeError: 123 is not a valid property name
}
//上面代码中，ownKeys方法虽然返回一个数组，但是每一个数组成员都不是字符串或 Symbol 值，因此就报错了。

//如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则报错。
if (0) {
  const obj = {}
  Object.defineProperty(obj, "a", {
    configurable: false,
    enumerable: true,
    value: 10,
  })

  const p = new Proxy(obj, {
    ownKeys: function (target) {
      return ["b"]
    },
  })

  Object.getOwnPropertyNames(p)
  // Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
}
//上面代码中，obj对象的a属性是不可配置的，这时ownKeys方法返回的数组之中，必须包含a，否则会报错。

//另外，如果目标对象是不可扩展的（non-extensition），这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。
if (1) {
  const obj = {
    a: 1,
  }

  Object.preventExtensions(obj)

  const p = new Proxy(obj, {
    ownKeys: function (target) {
      return ["a", "b"]
    },
  })

  Object.getOwnPropertyNames(p)
  // Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
}
//上面代码中，Obj对象是不可扩展的，这时ownKeys方法返回的数组之中，包含了obj对象的多余属性b，所以导致了报错。

