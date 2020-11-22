"use strict";

var _postal = _interopRequireDefault(require("postal"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function publish(topic, channelName) {
  return function (target, name, descriptor) {
    var fn = descriptor.value;

    descriptor.value = function () {
      var value = fn.apply(this, arguments);
      console.log(channelName);

      var channel = _postal["default"].channel(channelName || target.channel || "/");

      console.log(topic);
      console.log(value);
      channel.publish(topic, value);
    };
  };
} // 上面代码定义了一个名为publish的修饰器，它通过改写descriptor.value，
//使得原方法被调用时，会自动发出一个事件。它使用的事件“发布/订阅”库是Postal.js。


var FooComponent = (_dec = publish("messageEvent", "component"), (_class = /*#__PURE__*/function () {
  function FooComponent() {
    _classCallCheck(this, FooComponent);
  }

  _createClass(FooComponent, [{
    key: "someMethod",
    value: function someMethod() {
      return {
        my: "data"
      };
    }
  }]);

  return FooComponent;
}(), (_applyDecoratedDescriptor(_class.prototype, "someMethod", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "someMethod"), _class.prototype)), _class));
var foo = new FooComponent();
foo.someMethod(); // 在"component"频道发布"foo.some.message"事件，附带的数据是{ my: "data" }

var channel = _postal["default"].channel("component"); // subscribe to 'name.change' topics


var subscription = channel.subscribe("name.change", function (data) {
  console.log(11);
});

_postal["default"].subscribe({
  channel: "component",
  topic: "name.change",
  callback: function callback() {
    console.log("喜喜");
  }
});

_postal["default"].subscribe({
  channel: "component",
  topic: "messageEvent",
  callback: function callback() {
    console.log("010");
  }
}); // And someone publishes a name change:


channel.publish("name.change", {
  name: "Dr. Who"
});
