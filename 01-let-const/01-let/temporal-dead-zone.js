//暂时性死区
var temp = 123
if (true) {
  temp = "abc"
  let temp //temporal dead zone 结束
  console.log(temp) //undefined
}
/**上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。
 * ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
 */
console.log(typeof x)
let x
/**
 * 上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。
 * 但是将let x 给注解掉以后输出 undefined,所以，在没有let之前，typeof运算符是百分之百安全的，永远不会报错。
 * 这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。
 */

//有些“死区”比较隐蔽，不太容易发现。
function bar(x = y, y = 2) {
  //(x=2,y=x)就不会报错
  return [x, y]
}

bar() //报错 ReferenceError:
/**
 * 上面代码中，调用bar函数之所以报错（某些实现可能不报错），
 * 是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于”死区“。如果y的默认值是x，就不会报错，因为此时x已经声明了。
 */

//下面的代码也会报错

//不报错
var x = x
//报错
let x = x
/**
 * 上面代码报错，也是因为暂时性死区。
 * 使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。
 * 上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。
 * ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。
 * 这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。
 * 总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
 */