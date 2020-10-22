/**
 * Iterator接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（详见下文）。
当使用for...of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。

一种数据结构只要部署了Iterator接口，我们就称这种数据结构是”可遍历的“（iterable）。

ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，
或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。
Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。
至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为Symbol的特殊值，所以要放在方括号内。（参见Symbol一章）。
 */
if (0) {
  const obj = {
    [Symbol.iterator]: function () {
      return {
        next: function () {
          console.log(111)
          return { value: 1, done: true }
        },
      }
    },
  }
  console.log(obj[Symbol.iterator]().next())
}
//上面代码中，对象obj是可遍历的（iterable），因为具有Symbol.iterator属性。
//执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有next方法。
//每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

// 在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。
if (0) {
  let arr = ["a", "b", "c"]
  let iterator = arr[Symbol.iterator]()
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
}
/**
 * 上面代码中，变量arr是一个数组，原生就具有遍历器接口，部署在arr的Symbol.iterator属性上面。所以，调用这个属性，就得到遍历器对象。

上面提到，原生就部署Iterator接口的数据结构有三类，对于这三类数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。
除此之外，其他数据结构（主要是对象）的Iterator接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

对象（Object）之所以没有默认部署Iterator接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。
本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。
不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作Map结构使用，ES5没有Map结构，而ES6原生提供了。

一个对象如果要有可被for...of循环调用的Iterator接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
 */
if (0) {
  class RangeIterator {
    constructor(start, stop) {
      this.value = start
      this.stop = stop
    }
    [Symbol.iterator]() {
      return this
    }
    next() {
      let value = this.value
      if (value < this.stop) {
        this.value++
        return { done: false, value }
      }
      return { done: true, value: undefined }
    }
  }

  const range = (start, stop) => {
    return new RangeIterator(start, stop)
  }
  for (let i of range(0, 3)) {
    console.log(i) //有意思
  }
}
//上面代码是一个类部署Iterator接口的写法。Symbol.iterator属性对应一个函数，执行后返回当前对象的遍历器对象。

//下面是通过遍历器实现指针结构的例子。
if (0) {
  const Obj = function (value) {
    this.value = value
    this.next = null
  }

  Obj.prototype[Symbol.iterator] = function () {
    var iterator = {
      next: next, //next 是个函数
    }

    var current = this

    function next() {
      if (current) {
        var value = current.value
        current = current.next //最初为 null
        return {
          done: false,
          value: value,
        }
      } else {
        return {
          done: true,
        }
      }
    }

    return iterator
  }

  const one = new Obj(1)
  const two = new Obj(2)
  const three = new Obj(3)
  one.next = two
  two.next = three

  for (let i of one) {
    console.log(i) // 1,2,3
  }
}
//上面代码首先在构造函数的原型链上部署Symbol.iterator方法，调用该方法会返回遍历器对象iterator，
//调用该对象的next方法，在返回一个值的同时，自动将内部指针移到下一个实例。

if (0) {
  let obj = {
    data: ["hello", "world"],
    [Symbol.iterator]() {
      const self = this
      let index = 0
      return {
        next() {
          if (index < self.data.length) {
            return {
              value: self.data[index++],
            }
          } else {
            return {
              value: undefined,
              done: true,
            }
          }
        },
      }
    },
  }

  for (let i of obj) {
    console.log(i)
  } // hello world
}
//对于类似数组的对象（存在数值键名和length属性），部署Iterator接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的Iterator接口。
if (0) {
  const arrLike = {
    0: 1,
    2: 3,
    length: 5,
  }
  Reflect.setPrototypeOf(arrLike, {
    [Symbol.iterator]: Array.prototype[Symbol.iterator],
  })
  console.log(...arrLike)
}

//下面是类似数组的对象调用数组的Symbol.iterator方法的例子。
if (0) {
  let iterable = {
    0: "a",
    1: "b",
    2: "c",
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator],
  }
  for (let item of iterable) {
    console.log(item) // 'a', 'b', 'c'
  }
}

//注意，普通对象部署数组的Symbol.iterator方法，并无效果。
if (0) {
  let iterable = {
    a: "a",
    b: "b",
    c: "c",
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator],
  }
  for (let item of iterable) {
    console.log(item) // undefined, undefined, undefined
  }
}

//如果Symbol.iterator方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。
if (1) {
  const obj = {}
  obj[Symbol.iterator] = () => 1
  const a = [...obj] //Result of the Symbol.iterator method is not an object
}
//上面代码中，变量obj的Symbol.iterator方法对应的不是遍历器生成函数，因此报错。

//有了遍历器接口，数据结构就可以用for...of循环遍历（详见下文），也可以使用while循环遍历。
if (0) {
  var $iterator = ITERABLE[Symbol.iterator]()
  var $result = $iterator.next()
  while (!$result.done) {
    var x = $result.value
    // ...
    $result = $iterator.next()
  }
}
//面代码中，ITERABLE代表某种可遍历的数据结构，$iterator是它的遍历器对象。遍历器对象每次移动指针（next方法），都检查一下返回值的done属性，如果遍历还没结束，就移动遍历器对象的指针到下一步（next方法），不断循环。

