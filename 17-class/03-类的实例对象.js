//生成类的实例对象的写法，与ES5完全一样，也是使用new命令。如果忘记加上new，像函数那样调用Class，将会报错。
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
if (0) {
  // 报错
  var point = Point(2, 3)

  // 正确
  var point = new Point(2, 3)
}

//与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
if (0) {
  //定义类
  var point = new Point(2, 3)

  point.toString() // (2, 3)

  console.log(point.hasOwnProperty('x')) // true
  console.log(point.hasOwnProperty('y')) // true
  console.log(point.hasOwnProperty('toString')) // false
  console.log(point.__proto__.hasOwnProperty('toString')) // true
}

//与ES5一样，类的所有实例共享一个原型对象。
if (0) {
  var p1 = new Point(2, 3)
  var p2 = new Point(3, 2)
  console.log(p1.__proto__ === p2.__proto__) //true
}
//上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype，所以__proto__属性是相等的

//这也意味着，可以通过实例的__proto__属性为Class添加方法。
if (1) {
  const p1 = new Point(2, 3)
  const p2 = new Point(3, 2)

  p1.__proto__.printName = function () {
    return 'Oops'
  }

  console.log(p1.printName()) //Oops
  console.log(p2.printName()) //Oops
}
/**
上面代码在p1的原型上添加了一个printName方法，由于p1的原型就是p2的原型，因此p2也可以调用这个方法。
而且，此后新建的实例p3也可以调用这个方法。
这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变Class的原始定义，影响到所有实例。
 */