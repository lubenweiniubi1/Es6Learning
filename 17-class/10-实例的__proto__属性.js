/**
var b = new B()
子类实例的__proto__属性(b.__proto__=B.prototype)的  (B.prototype.__proto__ === A.prototype) __proto__属性，指向父类实例的__proto__属性。
也就是说，子类的原型的原型，是父类的原型。(真的绕)
 */
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y)
    this.color = color // 正确
  }
}
if (1) {
  const p1 = new Point(2, 3)
  const p2 = new ColorPoint(2, 3, 'end')
  console.log(p2.__proto__ === p1.__proto__) //false
  console.log(p2.__proto__.__proto__ === p1.__proto__) //true
  
}
//上面代码中，ColorPoint继承了Point，导致前者原型的原型是后者的原型。

//因此，通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为
if (0) {
  p2.__proto__.__proto__.printName = function () {
    console.log('Ha')
  }
  p1.printName() // "Ha"
}
