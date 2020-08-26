//ES6 引入 rest 参数（形式为“...变量名”），用于获取函数的多余参数，
//这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

function f(a, b, ...rest) {
  console.log(a, b)
  console.log(rest)
}
f(1, 2, 3, 4)
//1,2
//[ 3, 4 ]

function add(...values) {
  let sum = 0
  for (const value of values) {
    sum += value
  }
  return sum
}

console.log(add(1, 2, 3, 4, 5, 6)) //21
//上面代码的add函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。

//下面是一个 rest 参数代替arguments变量的例子。
// arguments变量的写法
function sortNumbers1() {
  return Array.prototype.slice.call(arguments).sort()
}
console.log(sortNumbers1(1, 23, 3, 41, 12)) //[ 1, 12, 23, 3, 41 ]

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort() //[ 1, 12, 23, 3, 41 ]
console.log(sortNumbers(1, 23, 3, 41, 12))
//上面代码的两种写法，比较后可以发现，rest 参数的写法更自然也更简洁

//rest 参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。
//下面是一个利用 rest 参数改写数组push方法的例子。

function push(array, ...items) {
  items.forEach((item) => {
    array.push(item)
  })
}

var a = []
push(a, 1, 2, 34, 54, 5, 5, 65, 6, 6, 6)
console.log(a)
/*[
    1,  2, 34, 54, 5,
    5, 65,  6,  6, 6
  ]
*/

//注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
if (1) {
  // 报错
  //   const f1 = function (a, ...b,c) {
  //SyntaxError: Rest parameter must be last formal parameter
  //   }
}
