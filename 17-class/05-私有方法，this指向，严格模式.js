/**
私有方法
私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。
 */
class Widget {
  // 公有方法
  foo(baz) {
    this._bar(baz)
  }

  // 私有方法
  _bar(baz) {
    return (this.snaf = baz)
  }

  // ...
}
//上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。
//但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

//另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的
if (0) {
  class Widget {
    foo(baz) {
      bar.call(this, baz)
    }

    // ...
  }
  function bar(baz) {
    return (this.snaf = baz)
  }
}
//上面代码中，foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

//还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
if (0) {
  const bar = Symbol('bar')
  const snaf = Symbol('snaf')

  //   export default
  class myClass {
    // 公有方法
    foo(baz) {
      this[bar](baz)
    }

    // 私有方法
    [bar](baz) {
      return (this[snaf] = baz)
    }

    // ...
  }
}
//上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

/**
this的指向
类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
 */
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`)
  }

  print(text) {
    console.log(text)
  }
}
if (0) {
  const logger = new Logger()
  logger.printName() //Hello there
  const { printName } = logger
  printName() //Cannot read property 'print' of undefined
}
//上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，
//this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。

//一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
if (0) {
  class Logger {
    constructor() {
      this.printName = this.printName.bind(this)
    }

    // ...
  }
}
// 另一种解决方法是使用箭头函数。
if (0) {
  class Logger {
    constructor() {
      this.printName = (name = 'there') => {
        this.print(`Hello ${name}`)
      }
    }

    // ...
  }
}
// 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
if (1) {
  function selfish(target) {
    const cache = new WeakMap()
    const handler = {
      get(target, key) {
        const value = Reflect.get(target, key) //获取原生的value
        //只处理取函数属性
        if (typeof value !== 'function') {
          return value
        }

        //weekMap中没有这个key 就设置为绑定
        if (!cache.has(value)) {
          cache.set(value, value.bind(target))
        }
        return cache.get(value)
      },
    }
    const proxy = new Proxy(target, handler)
    return proxy
  }

  const logger = selfish(new Logger())
  const { printName } = logger
  printName()
}

/**
严格模式
类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。
*/

/**
name属性

由于本质上，ES6的类只是ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
*/

if (1) {
  class Point {}
  Point.name // "Point"
}
// name属性总是返回紧跟在class关键字后面的类名。
