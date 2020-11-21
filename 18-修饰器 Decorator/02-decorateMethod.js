//方法的修饰
// 修饰器不仅可以修饰类，还可以修饰类的属性。
if (0) {
  class Person {
    @readonly
    name() {
      return `${this.first} ${this.last}`
    }
  }
}
// 上面代码中，修饰器readonly用来修饰“类”的name方法。
// 此时，修饰器函数一共可以接受三个参数，第一个参数是所要修饰的目标对象，第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象。
if (0) {
  function readonly(target, name, descriptor) {
    // descriptor对象原来的值如下
    // {
    //   value: specifiedFunction,
    //   enumerable: false,
    //   configurable: true,
    //   writable: true
    // };
    descriptor.writable = false
    return descriptor
  }
  readonly(Person.prototype, "name", descriptor)
  // 类似于
  Object.defineProperty(Person.prototype, "name", descriptor)
}
//上面代码说明，修饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。

//下面是另一个例子，修改属性描述对象的enumerable属性，使得该属性不可遍历。
if (0) {
  class Person {
    @nonenumerable
    get kidCount() {
      return this.children.length
    }
  }

  function nonenumerable(target, name, descriptor) {
    descriptor.enumerable = false
    return descriptor
  }
  console.log(Reflect.getOwnPropertyDescriptor(Person.prototype, "get"))
}

//下面的@log修饰器，可以起到输出日志的作用。

if (0) {
  class Math {
    @log
    add(a, b) {
      return a + b
    }
  }
  function log(target, name, descriptor) {
    var oldValue = descriptor.value
    descriptor.value = function () {
      console.log(`Calling "${name}" with`, arguments) //这里的arguments 是 value被调用的时候的参数数组
      return oldValue.apply(null, arguments)
    }
  }

  const math = new Math()

  // passed parameters should get logged now
  math.add(2, 4) //Calling "add" with [Arguments] { '0': 2, '1': 4 }
}
//上面代码中，@log修饰器的作用就是在执行原始的操作之前，执行一次console.log，从而达到输出日志的目的。

// 修饰器有注释的作用。
if (0) {
  @testable
  class Person {
    @readonly
    @nonenumerable
    name() {
      return `${this.first} ${this.last}`
    }
  }
}
//从上面代码中，我们一眼就能看出，Person类是可测试的，而name方法是只读和不可枚举的。

//如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。
if (1) {
  function dec(id) {
    console.log("evaluated", id)
    return (target, property, descriptor) => console.log("executed", id)
  }

  class Example {
    @dec(1)
    @dec(2)
    method() {}
  }
  // evaluated 1
  // evaluated 2
  // executed 2
  // executed 1
}
//上面代码中，外层修饰器@dec(1)先进入，但是内层修饰器@dec(2)先执行。
//除了注释，修饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是JavaScript代码静态分析的重要工具。