"use strict"

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ("value" in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context
) {
  var desc = {}
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key]
  })
  desc.enumerable = !!desc.enumerable
  desc.configurable = !!desc.configurable
  if ("value" in desc || desc.initializer) {
    desc.writable = true
  }
  desc = decorators
    .slice()
    .reverse()
    .reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc
    }, desc)
  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0
    desc.initializer = undefined
  }
  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc)
    desc = null
  }
  return desc
}

//方法的修饰
// 修饰器不仅可以修饰类，还可以修饰类的属性。
if (0) {
  var _class

  var _Person =
    ((_class = /*#__PURE__*/ (function () {
      function _Person() {
        _classCallCheck(this, _Person)
      }

      _createClass(_Person, [
        {
          key: "name",
          value: function name() {
            return "".concat(this.first, " ").concat(this.last)
          },
        },
      ])

      return _Person
    })()),
    _applyDecoratedDescriptor(
      _class.prototype,
      "name",
      [readonly],
      Object.getOwnPropertyDescriptor(_class.prototype, "name"),
      _class.prototype
    ),
    _class)
} // 上面代码中，修饰器readonly用来修饰“类”的name方法。
// 此时，修饰器函数一共可以接受三个参数，第一个参数是所要修饰的目标对象，第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象。

if (0) {
  var _readonly = function _readonly(target, name, descriptor) {
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

  _readonly(Person.prototype, "name", descriptor) // 类似于

  Object.defineProperty(Person.prototype, "name", descriptor)
} //上面代码说明，修饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。
//下面是另一个例子，修改属性描述对象的enumerable属性，使得该属性不可遍历。

if (0) {
  var _class2

  var _nonenumerable = function _nonenumerable(target, name, descriptor) {
    descriptor.enumerable = false
    return descriptor
  }

  var _Person2 =
    ((_class2 = /*#__PURE__*/ (function () {
      function _Person2() {
        _classCallCheck(this, _Person2)
      }

      _createClass(_Person2, [
        {
          key: "kidCount",
          get: function get() {
            return this.children.length
          },
        },
      ])

      return _Person2
    })()),
    _applyDecoratedDescriptor(
      _class2.prototype,
      "kidCount",
      [_nonenumerable],
      Object.getOwnPropertyDescriptor(_class2.prototype, "kidCount"),
      _class2.prototype
    ),
    _class2)

  console.log(Reflect.getOwnPropertyDescriptor(_Person2.prototype, "get"))
} //下面的@log修饰器，可以起到输出日志的作用。

if (0) {
  var _class3

  var log = function log(target, name, descriptor) {
    var oldValue = descriptor.value

    descriptor.value = function () {
      console.log('Calling "'.concat(name, '" with'), arguments) //这里的arguments 是 value被调用的时候的参数数组

      return oldValue.apply(null, arguments)
    }
  }

  var _Math =
    ((_class3 = /*#__PURE__*/ (function () {
      function _Math() {
        _classCallCheck(this, _Math)
      }

      _createClass(_Math, [
        {
          key: "add",
          value: function add(a, b) {
            return a + b
          },
        },
      ])

      return _Math
    })()),
    _applyDecoratedDescriptor(
      _class3.prototype,
      "add",
      [log],
      Object.getOwnPropertyDescriptor(_class3.prototype, "add"),
      _class3.prototype
    ),
    _class3)

  var math = new _Math() // passed parameters should get logged now

  math.add(2, 4) //Calling "add" with [Arguments] { '0': 2, '1': 4 }
} //上面代码中，@log修饰器的作用就是在执行原始的操作之前，执行一次console.log，从而达到输出日志的目的。
// 修饰器有注释的作用。

if (0) {
  var _class4, _class5

  var _Person3 =
    testable(
      (_class4 =
        ((_class5 = /*#__PURE__*/ (function () {
          function _Person3() {
            _classCallCheck(this, _Person3)
          }

          _createClass(_Person3, [
            {
              key: "name",
              value: function name() {
                return "".concat(this.first, " ").concat(this.last)
              },
            },
          ])

          return _Person3
        })()),
        _applyDecoratedDescriptor(
          _class5.prototype,
          "name",
          [readonly, nonenumerable],
          Object.getOwnPropertyDescriptor(_class5.prototype, "name"),
          _class5.prototype
        ),
        _class5))
    ) || _class4
} //从上面代码中，我们一眼就能看出，Person类是可测试的，而name方法是只读和不可枚举的。
//如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

if (1) {
  var _dec, _dec2, _class6

  var dec = function dec(id) {
    console.log("evaluated", id)
    return function (target, property, descriptor) {
      return console.log("executed", id)
    }
  }

  var Example =
    ((_dec = dec(1)),
    (_dec2 = dec(2)),
    ((_class6 = /*#__PURE__*/ (function () {
      function Example() {
        _classCallCheck(this, Example)
      }

      _createClass(Example, [
        {
          key: "method",
          value: function method() {},
        },
      ])

      return Example
    })()),
    _applyDecoratedDescriptor(
      _class6.prototype,
      "method",
      [_dec, _dec2],
      Object.getOwnPropertyDescriptor(_class6.prototype, "method"),
      _class6.prototype
    ),
    _class6))
}
