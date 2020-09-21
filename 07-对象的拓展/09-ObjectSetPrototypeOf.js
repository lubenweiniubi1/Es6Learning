//Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
// 格式
// Object.setPrototypeOf(object, prototype)

// 用法
var o = Object.setPrototypeOf({}, null)
//该方法等同于下面的函数。

function A(obj, proto) {
  obj.__proto__ = proto
  return obj
}

var proto = {}
let obj = { x: 10 }
Object.setPrototypeOf(obj, proto)

proto.x = 10
proto.y = 20

console.log(obj.x, obj.y) //10 20
//上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。

//如果第一个参数不是对象，会自动转为对象。
//但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
console.log(Object.setPrototypeOf(1, {}) === 1)
console.log(Object.setPrototypeOf("foo", {}) === "foo")
console.log(Object.setPrototypeOf(true, {}) === true)
// true
// true
// true

//由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
if (0) {
  Object.setPrototypeOf(undefined, {}) //TypeError: Object.setPrototypeOf called on null or undefined
  Object.setPrototypeOf(null, {}) //TypeError: Object.setPrototypeOf called on null or undefined
}
