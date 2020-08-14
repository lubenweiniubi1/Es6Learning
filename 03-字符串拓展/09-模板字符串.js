/**
 * 传统的JavaScript语言，输出模板通常是这样写的。

    $('#result').append(
    'There are <b>' + basket.count + '</b> ' +
    'items in your basket, ' +
    '<em>' + basket.onSale +
    '</em> are on sale!'
    );
上面这种写法相当繁琐不方便，ES6引入了模板字符串解决这个问题。

    $('#result').append(`
    There are <b>${basket.count}</b> items
    in your basket, <em>${basket.onSale}</em>
    are on sale!
    `);
 */

//模板字符串（template string）是增强版的字符串，用反引号（`）标识。
//它可以当作普通字符串使用，
//也可以用来定义多行字符串，或者在字符串中嵌入变量。

// 普通字符串
console.log(`In JavaScript '\n' is a line-feed.`)

var name = "Bob",
  time = "today"
console.log(`Hello ${name}, how are you ${time}?`)
//如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
console.log(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>`)

//模板字符串之中还能调用函数。
function fn() {
  return "Hello World"
}
console.log(`foo ${fn()} bar`)

// foo Hello World bar

//如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
// 变量 没有声明 将报错。
false && console.log(`Hello, ${place}`)

//由于模板字符串的大括号内部，就是执行JavaScript代码，因此如果大括号内部是一个字符串，将会原样输出。

//模板字符串甚至还能嵌套。

//如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。

if (1) {
  // 写法一
  let str = "return " + "`Hello ${name}!`"
  let func = new Function("name", str)
  func("Jack") // "Hello Jack!"
  console.log(func("Jack")) // ?  ? ? 这是干啥的
}
if (1) {
  let str = "(name) => `Hello ${name}!`"
  let func = eval.call(null, str)
  console.log(func("Jack")) // ?  ? ? 这是干啥的
}
complie(111)