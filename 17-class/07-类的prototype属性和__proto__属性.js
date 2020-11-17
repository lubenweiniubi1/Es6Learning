/**
大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。
Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。

（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
 */

if (1) {
  class A {}
  class B extends A {}

  console.log(B) //[Function: B]
  console.log(B === B.prototype.constructor) //true

  console.log(B.prototype) //B {}
  console.log(B.prototype.__proto__) //A {}  继承就是Animal.prototype = new Object()
  console.log(B.prototype.__proto__ === A.prototype) //true

  console.log(B.__proto__) //[Function: A]
  console.log(B.__proto__ === A) //true

  console.log(A.prototype) //A {}
  console.log(A) //[Function: A]

  console.log(A.__proto__) //[Function (anonymous)] Function.prototype
  console.log(A.__proto__ === Function.prototype) //true

  console.log(B.prototype === B) //false
}
// 上面代码中，子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性。

//这样的结果是因为，类的继承是按照下面的模式实现的。
if (0) {
  class A {}
  class B {}

  //实例B 继承 A的实例
  Object.setPrototypeOf(B.prototype, A.prototype)

  //B的实例 继承A的静态属性
  Object.setPrototypeOf(B, A)
}
//《对象的扩展》一章给出过Object.setPrototypeOf方法的实现。
if (0) {
  Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto
    return obj
  }
}

//因此，就得到了上面的结果。
if (0) {
  Object.setPrototypeOf(B.prototype, A.prototype)
  // 等同于
  B.prototype.__proto__ = A.prototype

  Object.setPrototypeOf(B, A)
  // 等同于
  B.__proto__ = A
}

//这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；
//作为一个构造函数，子类（B）的原型（prototype属性）是父类的实例。
if (0) {
  Object.create(A.prototype)
  //等同于
  B.prototype.__proto__ = A.prototype
}
