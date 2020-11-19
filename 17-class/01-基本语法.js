// JavaScript语言的传统方法是通过构造函数，定义并生成新对象。下面是一个例子。
if (1) {
  function Point(x, y) {
    this.x = x
    this.y = y
  }

  Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')'
  }

  const p = new Point(1, 2)
}

// 上面这种写法跟传统的面向对象语言（比如C++和Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

// ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。
//通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
//上面的代码用ES6的“类”改写，就是下面这样。
if (0) {
  //定义类
  class Point {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    toString() {
      return '(' + this.x + ', ' + this.y + ')'
    }
  }
}

/**
 * 上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，
 而this关键字则代表实例对象。也就是说，ES5的构造函数Point，对应ES6的Point类的构造方法。

Point类除了构造方法，还定义了一个toString方法。注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。
另外，方法之间不需要逗号分隔，加了会报错。

ES6的类，完全可以看作构造函数的另一种写法。
 */
if (0) {
  class Point {
    //...
  }
  console.log(typeof Point) //function
}
//上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

//使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。
if (0) {
  class Bar {
    doStuff() {
      console.log('stuff')
    }
  }

  const b = new Bar()
  b.doStuff() // "stuff"
}

//构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
if (0) {
  class Point {
    constructor() {
      // ...
    }
    toString() {
      // ...
    }

    toValue() {
      // ...
    }
  }

  //等同于
  Point.prototype = {
    toString() {},
    toValue() {},
  }
}

//在类的实例上面调用方法，其实就是调用原型上的方法。
if (0) {
  class B {}
  let b = new B()
  console.log(b.constructor === B.prototype.constructor) //true
}
//上面代码中，b是B类的实例，它的constructor方法就是B类原型的constructor方法。
// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
if (0) {
  class Point {
    constructor() {
      // ...
    }
  }

  Object.assign(Point.prototype, {
    toString() {},
    toValue() {},
  })
}

//prototype对象的constructor属性，直接指向“类”的本身，这与ES5的行为是一致的。
if (0) {
  class Point {}
  console.log(Point.prototype.constructor === Point) //true
}

//另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
if (0) {
  class Point {
    constructor(x, y) {
      // ...
    }

    toString() {
      // ...
    }
  }
  console.log(Object.keys(Point.prototype)) //[]

  console.log(Object.getOwnPropertyNames(Point.prototype)) //[ 'constructor', 'toString' ]
}
//上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。这一点与ES5的行为不一致。
if (1) {
  const Point = function (x, y) {
    //...
  }
  Point.prototype.toString = function () {}

  Object.keys(Point.prototype)
  // ["toString"]
  Object.getOwnPropertyNames(Point.prototype)
  // ["constructor","toString"]
}
//上面代码采用ES5的写法，toString方法就是可枚举的。

//类的属性名，可以采用表达式。
if (0) {
  let methodName = 'getArea'
  class Square {
    constructor(length) {
      // ...
    }

    [methodName]() {
      // ...
    }
  }
}
//上面代码中，Square类的方法名getArea，是从表达式得到的。