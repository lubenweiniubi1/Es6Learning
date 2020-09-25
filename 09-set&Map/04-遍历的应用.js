//扩展运算符（...）内部使用for...of循环，所以也可以用于Set结构。
var set = new Set(["red", "green", "blue"])
var arr = [...set]
console.log(arr) //[ 'red', 'green', 'blue' ]

//扩展运算符和Set结构相结合，就可以去除数组的重复成员。
var arr = [3, 5, 2, 2, 5, 5]
let unique = [...new Set(arr)]
// [3, 5, 2]

//而且，数组的map和filter方法也可以用于Set了。
var set = new Set([1, 2, 3])
set = new Set([...set].map((x) => x * 2))
console.log(set) //Set { 2, 4, 6 }

var set = new Set([1, 2, 3, 4, 5])
set = new Set([...set].filter((x) => x % 2 === 0))
console.log(set) // Set { 2, 4 }

//因此使用Set可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
var a = new Set([1, 2, 3])
var b = new Set([4, 3, 2])

var union = new Set([...a, ...b])
var difference = new Set([...a].filter((x) => !b.has(x)))
var intersec = new Set([...a].filter((x) => b.has(x)))
console.log(union) //Set { 1, 2, 3, 4 }
console.log(difference) //Set { 1 }
console.log(intersec) //Set { 2, 3 }

//如果想在遍历操作中，同步改变原来的Set结构，目前没有直接的方法，但有两种变通方法。
//一种是利用原Set结构映射出一个新的结构，然后赋值给原来的Set结构；另一种是利用Array.from方法。
var set = new Set([1, 2, 3])
set = new Set([...set].map((val) => val * 2))
console.log(set) //Set { 2, 4, 6 }
set = new Set(Array.from(set, (val) => 2 * val))
console.log(set) //Set { 4, 8, 12 }
//上面代码提供了两种方法，直接在遍历操作中改变原来的Set结构