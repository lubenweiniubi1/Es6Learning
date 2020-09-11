//ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
var foo = "bar"
var baz = { foo }
// 等同于
var baz = { foo: foo }

//上面代码表明，ES6 允许在对象之中，直接写变量。
//这时，属性名为变量名, 属性值为变量的值。下面是另一个例子。

function f(x, y) {
  return { x, y }
}
//等同于
function f(x, y) {
  return { x: x, y: y } //f(1, 2) // Object {x: 1, y: 2}
}

//除了属性简写，方法也可以简写
var o = {
  method() {
    return "hello"
  },
}
//等同于
var o = {
  method: function () {
    return "Hello"
  },
}

//下面是一个实际的例子。
var birth = "2002/01/01"

var Person = {
  name: "张三",
  birth,
  hello() {
    console.log("我的名字是", this.name)
  },
}
//这种写法用于函数的返回值，将会非常方便。
function getPoint() {
  var x = 1
  var y = 10
  return { x, y }
}

console.log(getPoint()) //{x:1,y:10}

//CommonJS模块输出变量，就非常合适使用简洁写法。
var ms = {}

function getItem(key) {
  return key in ms ? ms[key] : null
}
function setItem(key, value) {
  ms[key] = value
}
function clear() {
  ms = {}
}

module.exports = { getItem, setItem, clear }

// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear,
}

//属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。

var cart = {
  _wheels: 4,

  //每次获取这个属性都会执行这里的方法
  get wheels() {
    console.log("这里取值期")
    return this._wheels
  },

  //每次设置这个属性都会执行这里的方法
  set wheels(value) {
    console.log("这里趣致七期")
    if (value < this._wheels) {
      throw new Error("数值太小了")
    }
    this._wheels = value
  },
}

console.log(cart.wheels) //这里取值期 4
cart.wheels = 10 //这里趣致七期

//注意，简洁写法的属性名总是  字符串，这会导致一些看上去比较奇怪的结果。
var obj = {
  class() {},
}
//等同于
var obj = {
  class: function () {},
}
//上面代码中，class是字符串，所以不会因为它属于关键字，而导致语法解析报错。

//如果某个方法的值是一个Generator函数，前面需要加上星号。
var obj = {
  *m() {
    yield "hello world"
  },
}
