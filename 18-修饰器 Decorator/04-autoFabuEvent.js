// 我们可以使用修饰器，使得对象的方法被调用时，自动发出一个事件。
import postal from "postal"

function publish(topic, channelName) {
  return function (target, name, descriptor) {
    const fn = descriptor.value

    descriptor.value = function () {
      let value = fn.apply(this, arguments)
      console.log(channelName)
      const channel = postal.channel(channelName || target.channel || "/")
      console.log(topic)
      console.log(value)

      channel.publish(topic, value)
    }
  }
}

// 上面代码定义了一个名为publish的修饰器，它通过改写descriptor.value，
//使得原方法被调用时，会自动发出一个事件。它使用的事件“发布/订阅”库是Postal.js。
class FooComponent {
  @publish("messageEvent", "component")
  someMethod() {
    return {
      my: "data",
    }
  }
}
let foo = new FooComponent()

foo.someMethod() // 在"component"频道发布"foo.some.message"事件，附带的数据是{ my: "data" }

var channel = postal.channel("component")

// subscribe to 'name.change' topics
var subscription = channel.subscribe("name.change", function (data) {
  console.log(11)
})

postal.subscribe({
  channel: "component",
  topic: "name.change",
  callback: () => {
    console.log("喜喜")
  },
})

postal.subscribe({
  channel: "component",
  topic: "messageEvent",
  callback: () => {
    console.log("010")
  },
})

// And someone publishes a name change:
channel.publish("name.change", { name: "Dr. Who" })
