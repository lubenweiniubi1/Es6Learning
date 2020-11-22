"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持。

修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。

node 直接运行是会报错的，因为这只是个提案 ，需要babel插件
npm i @babel/cli @babel/core @babel/plugin-proposal-decorators @babel/preset-env

npx babel 01-decorator.js --out-dir ./babelScripts
 */
if (0) {
  var testable = function testable(target) {
    target.isTestable = true;
  }; // @testable


  var MytestableClass = function MytestableClass() {
    _classCallCheck(this, MytestableClass);
  };

  console.log(testable(MytestableClass)); //undefined

  console.log(MytestableClass.isTestable); //true
} //上面代码中，@testable就是一个修饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。
// 基本上，修饰器的行为就是下面这样。


if (0) {
  var _class;

  var A = decorator(_class = function A() {
    _classCallCheck(this, A);
  }) || _class; //等同于


  var A1 = function A1() {
    _classCallCheck(this, A1);
  };

  A = decorator(A1) || A1;
} //也就是说，修饰器本质就是编译时执行的函数。
// 修饰器函数的第一个参数，就是所要修饰的目标类。


if (0) {
  var _testable = function _testable(target) {// ...
  };
} //上面代码中，testable函数的参数target，就是会被修饰的类。
//如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。


if (0) {
  var _dec, _class2, _dec2, _class3;

  var _testable2 = function _testable2(isTestable) {
    return function (target) {
      target.isTestable = isTestable;
    };
  };

  var _MytestableClass = (_dec = _testable2(true), _dec(_class2 = function _MytestableClass() {
    _classCallCheck(this, _MytestableClass);
  }) || _class2);

  var Myclass = (_dec2 = _testable2(false), _dec2(_class3 = function Myclass() {
    _classCallCheck(this, Myclass);
  }) || _class3);
  console.log(_MytestableClass.isTestable); //true

  console.log(Myclass.isTestable); //false
} //上面代码中，修饰器testable可以接受参数，这就等于可以修改修饰器的行为。
//前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作


if (0) {
  var _class4;

  var _testable3 = function _testable3(target) {
    target.prototype.isTestable = 1;
  };

  var MyTestableClass = _testable3(_class4 = function MyTestableClass() {
    _classCallCheck(this, MyTestableClass);
  }) || _class4;

  console.log(new MyTestableClass().isTestable); //1
} //上面代码中，修饰器函数testable是在目标类的prototype对象上添加属性，因此就可以在实例上调用。
//下面是另外一个例子。


if (1) {
  var _dec3, _class5;

  var mixins = function mixins() {
    for (var _len = arguments.length, list = new Array(_len), _key = 0; _key < _len; _key++) {
      list[_key] = arguments[_key];
    }

    return function (target) {
      Object.assign.apply(Object, [target.prototype].concat(list));
    };
  };

  var Foo = {
    foo: function foo() {
      console.log("foo");
    }
  };
  var MyClass = (_dec3 = mixins(Foo), _dec3(_class5 = function MyClass() {
    _classCallCheck(this, MyClass);
  }) || _class5);
  var obj = new MyClass();
  obj.foo();
}
