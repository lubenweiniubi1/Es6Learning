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
