//WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。
var map = new WeakMap()
map.set(1, 2) // TypeError: 1 is not an object!
map.set(Symbol(), 2) // TypeError: Invalid value used as weak map key
//上面代码中，如果将1和Symbol作为WeakMap的键名，都会报错。

//WeakMap的设计目的在于，键名是对象的弱引用（垃圾回收机制不将该引用考虑在内），
//所以其所对应的对象可能会被自动回收。当对象被回收后，WeakMap自动移除对应的键值对。
//典型应用是，一个对应DOM元素的WeakMap结构，当某个DOM元素被清除，
//其所对应的WeakMap记录就会自动被移除。基本上，WeakMap的专用场合就是，
//它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

var wm = new WeakMap()
var element = document.querySelector(".element")

wm.set(element, "Original")
wm.get(element) // "Original"

element.parentNode.removeChild(element)
element = null
wm.get(element) // undefined
//上面代码中，变量wm是一个WeakMap实例，我们将一个DOM节点element作为键名，然后销毁这个节点，element对应的键就自动消失了，再引用这个键名就返回undefined。

//WeakMap与Map在API上的区别主要是两个，一是没有遍历操作（即没有key()、values()和entries()方法），也没有size属性；
//二是无法清空，即不支持clear方法。
//这与WeakMap的键不被计入引用、被垃圾回收机制忽略有关。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。
//var wm = new WeakMap();

wm.size
// undefined

wm.forEach
// undefined

//前文说过，WeakMap应用的典型场合就是DOM节点作为键名。下面是一个例子。

let myElement = document.getElementById("logo")
let myWeakmap = new WeakMap()

myWeakmap.set(myElement, { timesClicked: 0 })

myElement.addEventListener(
  "click",
  function () {
    let logoData = myWeakmap.get(myElement)
    logoData.timesClicked++
  },
  false
)
//上面代码中，myElement是一个 DOM 节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是myElement。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

//WeakMap 的另一个用处是部署私有属性。

let _counter = new WeakMap()
let _action = new WeakMap()

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter)
    _action.set(this, action)
  }
  dec() {
    let counter = _counter.get(this)
    if (counter < 1) {
      return
    }
    counter--
    _counter.set(this, counter)
    if (counter === 0) {
      _action.get(this)()
    }
  }
}

let c = new Countdown(2, () => console.log("DONE"))

c.dec()
c.dec()
// DONE
//上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
