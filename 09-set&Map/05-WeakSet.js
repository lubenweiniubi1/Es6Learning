/**
 * WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。
   首先，WeakSet的成员只能是对象，而不能是其他类型的值。
   其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，
        也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，
        不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。
 */
var ws = new WeakSet()
0 && ws.add(1) //TypeError: Invalid value used in weak set
0 && ws.add(Symbol()) //TypeError: Invalid value used in weak set
//上面代码试图向WeakSet添加一个数值和Symbol值，结果报错，因为WeakSet只能放置对象。

//WeakSet是一个构造函数，可以使用new命令，创建WeakSet数据结构。
var ws = new WeakSet()

//作为构造函数，WeakSet可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有iterable接口的对象，都可以作为WeakSet的参数。）该数组的所有成员，都会自动成为WeakSet实例对象的成员。
ws = new WeakSet([
  [1, 3],
  [2, 5],
])
console.log(ws) //WeakSet { <items unknown> }
//上面代码中，a是一个数组，它有两个成员，也都是数组。将a作为WeakSet构造函数的参数，a的成员会自动成为WeakSet的成员。
//注意，是a数组的成员成为WeakSet的成员，而不是a数组本身。这意味着，数组的成员只能是对象。
var b = [3, 4]
// var ws = new WeakSet(b); // Uncaught TypeError: Invalid value used in weak set(…)
//上面代码中，数组b的成员不是对象，加入WeaKSet就会报错。

/**WeakSet结构有以下三个方法。

WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。
WeakSet.prototype.delete(value)：清除WeakSet实例的指定成员。
WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在WeakSet实例之中。
*/
var ws = new WeakSet()
var obj = {}
var foo = {}

ws.add(global)
ws.add(obj)

console.log(ws.has(global)) // true
console.log(ws.has(foo)) // false

ws.delete(global)
console.log(ws.has(global)) // false

//WeakSet没有size属性，没有办法遍历它的成员。
console.log(ws.size)
console.log(ws.forEach)
//上面代码试图获取size和forEach属性，结果都不能成功。

//WeakSet不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
//WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
var foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method() {
    if (!foo.has(this)) {
      throw new TypeError("Foo.prototype.method 只能在Foo的实例上调用")
    }
  }
}

//上面代码保证了Foo的实例方法，只能在Foo的实例上调用。
//这里使用WeakSet的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。