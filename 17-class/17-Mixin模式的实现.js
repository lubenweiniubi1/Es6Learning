//Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。它在ES6的实现如下。
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin)
    copyProperties(Mix.prototype, mixin.prototype)
  }
  return Mix
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== "constructor" && key !== "prototype" && key !== "name") {
      let desc = Reflect.getOwnPropertyDescriptor(source, key)
      Reflect.defineProperty(target, key, desc)
    }
  }
}
//上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
if (0) {
  class DistributedEdit extends mix(Loggable, Serializable) {
    // ...
  }
}

//联系
class A {
  constructor() {
    this.saber = "saber"
  }

  toString() {
    console.log("a")
  }
}

class B extends A {
  constructor() {}
  toStringB() {
    console.log("b")
  }
}
const c = mix(A, B)

console.log(Reflect.ownKeys(c)) //[ 'length', 'prototype', 'name' ]
