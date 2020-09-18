//Object.getOwnPropertyDescriptors()
//ES5有一个Object.getOwnPropertyDescriptor方法，返回某个对象属性的描述对象（descriptor）。

var obj = { p: "a" }

console.log(Object.getOwnPropertyDescriptor(obj, "p")) //
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

//ES2017 引入了Object.getOwnPropertyDescriptors方法，返回指定对象所有自身属性（非继承属性）的描述对象。
var obj = {
  foo: 123,
  get bar() {
    return "abc"
  },
}

console.log(Object.getOwnPropertyDescriptors(obj))
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
//上面代码中，Object.getOwnPropertyDescriptors方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。
function getOwnPropertyDescriptors(obj) {
  const result = {}
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key)
  }
  return result
}

//该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题
var source = {
  set foo(value) {
    console.log(value)
  },
}

var target1 = {}
Object.assign(target1, source)
console.log(Object.getOwnPropertyDescriptor(target1, "foo"))
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }
//上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，
//结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。

console.log("--------------------------------111111---")
//这时，Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正确拷贝。
var source = {
  set foo(value) {
    console.log(value, "尼玛死了") //拷贝的事后不会执行
  },
}

var target2 = {}
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source))
console.log(Object.getOwnPropertyDescriptor(target2, "foo"))
// { get: undefined,
//   set: [Function: foo],
//   enumerable: true,
//   configurable: true }

//Object.getOwnPropertyDescriptors方法的另一个用处，是配合Object.create方法，将对象属性克隆到一个新对象。这属于浅拷贝。

const clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

// 或者

const shallowClone = (obj) =>
  Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  )
//上面代码会克隆对象obj。
