//Map结构的实例有以下属性和操作方法。

//（1）size属性
//size属性返回Map结构的成员总数。

var map = new Map()
map.set("foo", true)
map.set("bar", false)
console.log(map.size) //2

//（2）set(key, value)
//set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。
//set方法返回的是Map本身，因此可以采用链式写法。
var mp = new Map().set(1, "a").set(2, "c").set(3, "d")
console.log(mp) //Map { 1 => 'a', 2 => 'c', 3 => 'd' }

//（3）get(key)

//（4）has(key)
//has方法返回一个布尔值，表示某个键是否在Map数据结构中。

//（5）delete(key)
//delete方法删除某个键，返回true。如果删除失败，返回false。
var m = new Map()
m.set(undefined, "nah")
console.log(m.has(undefined)) //true
console.log(m.delete(undefined)) //true
console.log(m.has(undefined)) //false

//（6）clear()
//clear方法清除所有成员，没有返回值。

var map = new Map()
map.set("foo", true)
map.set("bar", false)
console.log(map.size) //2
map.clear()
console.log(map.size)//0
