"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _coreDecorators = require("core-decorators");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

if (0) {
  var _class;

  var Person = (_class = /*#__PURE__*/function () {
    function Person() {
      _classCallCheck(this, Person);
    }

    _createClass(Person, [{
      key: "getPerson",
      value: function getPerson() {
        return this;
      }
    }]);

    return Person;
  }(), (_applyDecoratedDescriptor(_class.prototype, "getPerson", [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, "getPerson"), _class.prototype)), _class);
  var person = new Person();
  var getPerson = person.getPerson;
  console.log(getPerson() === person); // true
} // （2）@readonly
// readonly修饰器使得属性或方法不可写。


if (0) {
  var _class2, _descriptor, _temp;

  var Meal = (_class2 = (_temp = function Meal() {
    _classCallCheck(this, Meal);

    _initializerDefineProperty(this, "entree", _descriptor, this);
  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "entree", [_coreDecorators.readonly], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return "steak";
    }
  })), _class2);
  var dinner = new Meal();
  dinner.entree = "salmon"; // Cannot assign to read only property 'entree' of [object Object]
} // （3）@override
// override修饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。


if (0) {
  var _class4, _class5;

  var Parent = /*#__PURE__*/function () {
    function Parent() {
      _classCallCheck(this, Parent);
    }

    _createClass(Parent, [{
      key: "speak",
      value: function speak(first, second) {}
    }]);

    return Parent;
  }();

  var Child = (_class4 = /*#__PURE__*/function (_Parent) {
    _inherits(Child, _Parent);

    var _super = _createSuper(Child);

    function Child() {
      _classCallCheck(this, Child);

      return _super.apply(this, arguments);
    }

    _createClass(Child, [{
      key: "speak",
      value: function speak() {} // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)

    }]);

    return Child;
  }(Parent), (_applyDecoratedDescriptor(_class4.prototype, "speak", [_coreDecorators.override], Object.getOwnPropertyDescriptor(_class4.prototype, "speak"), _class4.prototype)), _class4); // or

  var Child2 = (_class5 = /*#__PURE__*/function (_Parent2) {
    _inherits(Child2, _Parent2);

    var _super2 = _createSuper(Child2);

    function Child2() {
      _classCallCheck(this, Child2);

      return _super2.apply(this, arguments);
    }

    _createClass(Child2, [{
      key: "speaks",
      value: function speaks() {} // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
      //
      //   Did you mean "speak"?

    }]);

    return Child2;
  }(Parent), (_applyDecoratedDescriptor(_class5.prototype, "speaks", [_coreDecorators.override], Object.getOwnPropertyDescriptor(_class5.prototype, "speaks"), _class5.prototype)), _class5);
} // （4）@deprecate (别名@deprecated)
// deprecate或deprecated修饰器在控制台显示一条警告，表示该方法将废除。


if (0) {
  var _dec, _dec2, _class6;

  var _Person = (_dec = (0, _coreDecorators.deprecate)("We stopped facepalming"), _dec2 = (0, _coreDecorators.deprecate)("We stopped facepalming", {
    url: "http://knowyourmeme.com/memes/facepalm"
  }), (_class6 = /*#__PURE__*/function () {
    function _Person() {
      _classCallCheck(this, _Person);
    }

    _createClass(_Person, [{
      key: "facepalm",
      value: function facepalm() {}
    }, {
      key: "facepalmingHard",
      value: function facepalmingHard() {}
    }, {
      key: "facepalmHarder",
      value: function facepalmHarder() {}
    }]);

    return _Person;
  }(), (_applyDecoratedDescriptor(_class6.prototype, "facepalm", [_coreDecorators.deprecate], Object.getOwnPropertyDescriptor(_class6.prototype, "facepalm"), _class6.prototype), _applyDecoratedDescriptor(_class6.prototype, "facepalmingHard", [_dec], Object.getOwnPropertyDescriptor(_class6.prototype, "facepalmingHard"), _class6.prototype), _applyDecoratedDescriptor(_class6.prototype, "facepalmHarder", [_dec2], Object.getOwnPropertyDescriptor(_class6.prototype, "facepalmHarder"), _class6.prototype)), _class6));

  var _person = new _Person();

  _person.facepalm(); // DEPRECATION Person#facepalm: This function will be removed in future versions.


  _person.facepalmingHard(); // DEPRECATION Person#facepalmHard: We stopped facepalming


  _person.facepalmHarder(); // DEPRECATION Person#facepalmHarder: We stopped facepalming
  //
  //     See http://knowyourmeme.com/memes/facepalm for more details.
  //

} // （5）@suppressWarnings
// suppressWarnings修饰器抑制decorated修饰器导致的console.warn()调用。
//但是，异步代码发出的调用除外。


if (1) {
  var _class7;

  var Person3 = (_class7 = /*#__PURE__*/function () {
    function Person3() {
      _classCallCheck(this, Person3);
    }

    _createClass(Person3, [{
      key: "facepalm",
      value: function facepalm() {}
    }, {
      key: "facepalmWithoutWarning",
      value: function facepalmWithoutWarning() {
        this.facepalm();
      }
    }]);

    return Person3;
  }(), (_applyDecoratedDescriptor(_class7.prototype, "facepalm", [_coreDecorators.deprecated], Object.getOwnPropertyDescriptor(_class7.prototype, "facepalm"), _class7.prototype), _applyDecoratedDescriptor(_class7.prototype, "facepalmWithoutWarning", [_coreDecorators.suppressWarnings], Object.getOwnPropertyDescriptor(_class7.prototype, "facepalmWithoutWarning"), _class7.prototype)), _class7);

  var _person2 = new Person3();

  _person2.facepalmWithoutWarning(); // no warning is logged  ?????????????

}
