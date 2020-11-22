import postal from "postal"

export default function publish(topic, channelName) {
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
