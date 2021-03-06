//编程实务中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。
//比如，要读取message.body.user.firstName，安全的写法是写成下面这样。
var message = {}
// var firstName =
//   (message &&
//     message.body &&
//     message.body.user &&
//     message.body.user.firstName) ||
//   "default"

//这样的层层判断非常麻烦，因此现在有一个提案，引入了“Null 传导运算符”（null propagation operator）?.，简化上面的写法。
var firstName2 = message?.body?.user?.firstName || "default"
console.log(firstName2)

/**
 * 
“Null 传导运算符”有四种用法。

obj?.prop // 读取对象属性
obj?.[expr] // 同上
func?.(...args) // 函数或对象方法的调用
new C?.(...args) // 构造函数的调用
传导运算符之所以写成obj?.prop，而不是obj?prop，是为了方便编译器能够区分三元运算符?:（比如obj?prop:123）。
 */

//下面是更多的例子。

// 如果 a 是 null 或 undefined, 返回 undefined
// 否则返回 a.b.c().d
a?.b.c().d

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
// 否则执行 a.b = 42
a?.b = 42

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
delete a?.b
