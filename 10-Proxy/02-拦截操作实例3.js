//has()
//has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
//下面的例子使用has方法隐藏某些属性，不被in运算符发现。
var handler = {
  has(target, key) {
    if (key[0] === "_") {
      return false
    }
    return key in target
  },
}
var target = { _prop: "foo", prop: "foo" }
var proxy = new Proxy(target, handler)
console.log("_prop" in proxy)
//上面代码中，如果原对象的属性名的第一个字符是下划线，proxy.has就会返回false，从而不会被in运算符发现。

//如果原对象不可配置或者禁止扩展，这时has拦截会报错。
var obj = { a: 10 }
Object.preventExtensions(obj)

var p = new Proxy(obj, {
  has: function (target, key) {
    return false
  },
})
0 && console.log("a" in p) //报错
//上面代码中，obj对象禁止扩展，结果使用has拦截就会报错。也就是说，如果某个属性不可配置（或者目标对象不可扩展），则has方法就不得“隐藏”（即返回false）目标对象的该属性。

//值得注意的是，has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断一个属性是对象自身的属性，还是继承的属性。
//另外，虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效。
let stu1 = { name: "Tom", score: 59 }
let stu2 = { name: "Jim", score: 99 }
let handler2 = {
  has(target, prop) {
    if (prop === "score" && target[prop] < 60) {
      console.log(`${target.name} 不及格 `)
      return false
    }
    return prop in target
  },
}

let opr1 = new Proxy(stu1, handler2)
let opr2 = new Proxy(stu2, handler2)

console.log("score" in opr1) //Tom 不及格  false
console.log("score" in opr2) //true

for (let a in opr1) {
  console.log(opr1[a]) //tom 59
}
//上面代码中，has拦截只对in循环生效，对for...in循环不生效，导致不符合要求的属性没有被排除在for...in循环之外。

//construct
//construct方法用于拦截new命令，下面是拦截对象的写法。
/**
var handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};
construct方法可以接受两个参数。
   target: 目标对象
   args：构建函数的参数对象
 */

var p = new Proxy(function () {}, {
  construct: function (target, args) {
    console.log("called:" + args.join(", "))
    return { value: args[0] * 10 }
  },
})

console.log(new p(1, 2, 3, 4, 5).value) //10
//construct方法返回的必须是一个对象，否则会报错。
var p = new Proxy(function () {}, {
  construct: function (target, argumentsList) {
    return 1
  },
})

0 && new p() // 报错

//deleteProperty()
//deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
var handler = {
  deleteProperty(target, key) {
    invariant(key, "delete")
    return true
  },
}
function invariant(key, action) {
  if (key[0] === "_") {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}

var target = { _prop: "foo", zss: 20 }
var proxy = new Proxy(target, handler)
delete proxy.zss
console.log(proxy)
// Error: Invalid attempt to delete private "_prop" property
//上面代码中，deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。
//注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。

//defineProperty()
//defineProperty方法拦截了Object.defineProperty操作。
var handler = {
  defineProperty(target, key, descriptor) {
    return true
  },
}
var target = {}
var proxy = new Proxy(target, handler)
proxy.foo = "bar"
console.log(proxy)
// TypeError: proxy defineProperty handler returned false for property '"foo"'
//上面代码中，defineProperty方法返回false，导致添加新属性会抛出错误。
//注意，如果目标对象不可扩展（extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。
