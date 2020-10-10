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
