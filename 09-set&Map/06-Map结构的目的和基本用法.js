//JavaScript的对象（Object），本质上是键值对的集合（Hash结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制
if (0) {
  var data = {}
  var element = document.getElementById("myDiv")

  data[element] = "metadata"
  data["[object HTMLDivElement]"] // "metadata"
  //上面代码原意是将一个DOM节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[object HTMLDivElement]。
}

//为了解决这个问题，ES6提供了Map数据结构。
//它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
//也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。
var m = new Map()
var o = { p: "Hello World" }

m.set(o, "content")
console.log(m.get(o)) //content
console.log(m.has(o)) //true
console.log(m.delete(o)) //true
console.log(m.has(o)) //false
//上面代码使用set方法，将对象o当作m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。

//作为构造函数，Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
var mp = new Map([
  ["name", "张三"],
  ["title", "Author"],
])
console.log(mp) //Map { 'name' => '张三', 'title' => 'Author' }
//上面代码在新建Map实例时，就指定了两个键name和title。

//Map构造函数接受数组作为参数，实际上执行的是下面的算法。
var items = [
  ["name", "张三"],
  ["title", "Author"],
]
var mps = new Map(items)
mps.forEach(([key, value]) => {
  mp.set(key, value)
})

//下面的例子中，字符串true和布尔值true是两个不同的键。
var m = new Map([
  [true, "foo"],
  ["true", "bar"],
])
console.log(m.get(true)) //foo
console.log(m.get("true")) //bar

//如果对同一个键多次赋值，后面的值将覆盖前面的值。
var map = new Map()

map.set(1, "a").set(1, "b")

console.log(map.get(1)) // "b"
//上面代码对键1连续赋值两次，后一次的值覆盖前一次的值。

//如果读取一个未知的键，则返回undefined
console.log(new Map().get("尼玛死了")) // undefined

//注意，只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。
var np = new Map()
np.set(["a"], 555)
console.log(np.get(["a"])) //undefined
//上面代码的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined。

//同理，同样的值的两个实例，在Map结构中被视为两个键。
var map = new Map()

var k1 = ["a"]
var k2 = ["a"]

map.set(k1, 111).set(k2, 222)

map.get(k1) // 111
map.get(k2) // 222
//上面代码中，变量k1和k2的值是一样的，但是它们在Map结构中被视为两个键。

//由上可知，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
//这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名

//如果Map的键是一个简单类型的值（数字、字符串、布尔值），
//则只要两个值严格相等，Map将其视为一个键，包括0和-0。
//另外，虽然NaN不严格相等于自身，但Map将其视为同一个键。
var map = new Map()
map.set(NaN, 123)
console.log(map.get(NaN)) //123

map.set(-0, 123)
console.log(map.get(+0)) //123
