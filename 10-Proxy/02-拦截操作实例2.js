//下面的例子则是利用get拦截，实现一个生成各种DOM节点的通用函数dom。
const dom = new Proxy(
  {},
  {
    get(target, property) {
      return function (attrs = {}, ...children) {
        const el = document.createElement(property)
        for (let prop of Object.keys(attrs)) {
          el.setAttribute(prop, attrs[prop])
        }
        for (let child of children) {
          if (typeof child === "string") {
            child = document.createTextNode(child)
          }
          el.appendChild(child)
        }
        return el
      }
    },
  }
)

//如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。
var target = Object.defineProperties(
  {},
  {
    foo: {
      value: 123,
      writable: false,
      configurable: false,
    },
  }
)
var handler = {
  get(target, propKey) {
    return "abc"
  },
}
var proxe = new Proxy(target, handler)
0 && proxe.foo //TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '123' but got 'abc')\

/**
 * set()
   set方法用来拦截某个属性的赋值操作。

   假定Person对象有一个age属性，该属性应该是一个不大于200的整数，那么可以使用Proxy保证age的属性值符合要求。
 */

let validator = {
  set: function (obj, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer")
      }
      if (value > 200) {
        throw new RangeError("The age seem invalid")
      }
    }

    //对于age意外的属性可以保存
    obj[prop] = value
  },
}
let person = new Proxy({}, validator)
person.age = 100
0 && (person.age = "yang ") //报错
0 && (person.age = 2000) // 报错

//上面代码中，由于设置了存值函数set，任何不符合要求的age属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。
//利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。

//有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。
var handler = {
  get(target, key) {
    invariant(key, "get")
    return target[key]
  },
  set(target, key, value) {
    invariant(key, "set")
    target[key] = value
    return true
  },
}

function invariant(key, action) {
  if (key[0] === "_") {
    throw new Error(`Invalid atempt to ${action} private ${key} property`)
  }
}

var target = {}
var pex = new Proxy(target, handler)
0 && console.log(pex.a) //报错
// pex._a = 10
console.log(pex.a)
0 && console.log(pex._a) //报错
//上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。
//注意，如果目标对象自身的某个属性，不可写也不可配置，那么set不得改变这个属性的值，只能返回同样的值，否则报错。

//apply()
//apply方法拦截函数的调用、call和apply操作。
//apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
// var handler = {
//   apply(target, ctx, args) {
//     return Reflect.apply(...arguments)
//   },
// }
//例子：
var target = function () {
  return "Im the target"
}
var handler = {
  apply: function () {
    return "Im the proxy"
  },
}

var p = new Proxy(target, handler)
console.log(p())
//上面代码中，变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。

//下面是另外一个例子。
var twice = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2
  },
}
function sum(left, right) {
  return left + right
}
var proxx = new Proxy(sum, twice)
console.log(proxx(1, 2)) //6
console.log(proxx.call(null, 5, 6)) // 22
console.log(proxx.apply(null, [7, 8])) // 30
// 上面代码中，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。
//另外，直接调用Reflect.apply方法，也会被拦截。
Reflect.apply(proxx, null, [9, 10]) //38
