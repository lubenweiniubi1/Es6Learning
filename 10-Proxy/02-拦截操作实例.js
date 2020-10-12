//下面是上面这些拦截方法的详细介绍。
//get()
// get方法用于拦截某个属性的读取操作。上文已经有一个例子，下面是另一个拦截读取操作的例子。
var person = { name: "张三" }

var proxy = new Proxy(person, {
  get: function (target, property) {
    if (property in target) {
      return target[property]
    } else {
      throw new ReferenceError('Property "' + property + '" does not exist.')
    }
  },
})

console.log(proxy["name"]) //张三
0 && console.log(proxy["ss"]) //ReferenceError: Property "ss" does not exist.

console.log("a" in { a: 1 }) //true
//上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。

//get方法可以继承。
var proto = new Proxy(
  { name: 10 },
  {
    get(target, propertyKey, receiver) {
      console.log("GET" + propertyKey)
    },
  }
)
var ojj = Object.create(proto)
ojj.x //GETx
//上面代码中，拦截操作定义在Prototype对象上面，所以如果读取obj对象继承的属性时，拦截会生效。

//下面的例子使用get拦截，实现数组读取负数的索引。
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey)
      if (index < 0) {
        propKey = String(target.length + index)
      }
      return Reflect.get(target, propKey, receiver)
    },
  }
  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}

let arr = createArray("a", "b", "c")
console.log(arr[-1]) //c
//上面代码中，数组的位置参数是-1，就会输出数组的倒数最后一个成员。

//利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作
var pipe = (function () {
  return function (value) {
    var funcStack = []
    var oproxy = new Proxy(
      {},
      {
        get: function (pipeObject, fnName) {
          console.log(fnName)
          if (fnName === "get") {
            return funcStack.reduce(function (val, fn) {
              console.log(fn)
              return fn(val)
            }, value)
          }
          funcStack.push(window[fnName])
          return oproxy
        },
      }
    )

    return oproxy
  }
})()
var double = (n) => n * 2
var pow = (n) => n * n
var reverseInt = (n) => n.toString().split("").reverse().join("") | 0
console.log(pipe(3).double.pow.reverseInt.get)
//上面代码设置 Proxy 以后，达到了将函数名链式使用的效果。