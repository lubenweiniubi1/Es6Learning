//Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多
class Point {}
if (0) {
  class ColorPoint extends Point {}
}
//上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。
//但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。下面，我们在ColorPoint内部加上代码。
if (0) {
  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y) // 调用父类的constructor(x, y)
      this.color = color
    }

    toString() {
      return this.color + ' ' + super.toString() // 调用父类的toString()
    }
  }
}
//上面代码中，constructor方法和toString方法之中，都出现了super关键字，
//它在这里表示父类的构造函数，用来新建父类的this对象。

// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。
//如果不调用super方法，子类就得不到this对象。
if (0) {
  class ColorPoint extends Point {
    constructor() {}
  }

  let cp = new ColorPoint() // ReferenceError
}
// 上面代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，导致新建实例时报错。

// ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

// 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
if (0) {
  //   class A {
  //     constructor(...args) {
  //       super(...args)
  //     }
  //   }
}

//另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
//这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
if (1) {
  class Point {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
  }
  class ColorPoint extends Point {
    constructor(x, y, color) {
      //   this.color = color // ReferenceError
      super(x, y, color)
      this.color = color //正确
    }
  }
  //下面是生成子类实例的代码。

  let cp = new ColorPoint(25, 8, 'green')

  console.log(cp instanceof Point) //true
  console.log(cp instanceof ColorPoint) //true

  // 上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与ES5的行为完全一致。
}
//上面代码中，子类的constructor方法没有调用super之前，就使用this关键字，结果报错，而放在super方法之后就是正确的。
