/**
 * Set结构的实例有以下属性。
 * 
    Set.prototype.constructor：构造函数，默认就是Set函数。
    Set.prototype.size：返回Set实例的成员总数。

   Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

    add(value)：添加某个值，返回Set结构本身。
    delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
    has(value)：返回一个布尔值，表示该值是否为Set的成员。
    clear()：清除所有成员，没有返回值。
 */
var s = new Set()
s.add(1).add(2).add(2).add("3")
console.log(s) //Set { 1, 2, '3' }

//下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。
var properties = {
  width: 1,
  height: 1,
}
if (properties["width"]) {
  //do something
}

var properties = new Set()
properties.add("width")
properties.add("height")

if (properties.has("width")) {
  console.log(11)
}

//Array.from方法可以将Set结构转为数组。
var items = new Set([1, 2, 3, 4, 5, 6])
var arr = Array.from(items)
console.log(arr)

//这就提供了去除数组重复成员的另一种方法。
function dedupe(arr) {
  return Array.from(new Set(arr))
}
console.log(dedupe([1, 2, 3, 3, 3, 3, 3, 3, 3, 4, ,])) //[ 1, 2, 3, 4, undefined ]
