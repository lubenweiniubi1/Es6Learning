//ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，
//会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
console.log("x".padStart(5, "ab")) //ababx
console.log("x".padStart(4, "ab")) //abax
console.log("x".padEnd(5, "ab")) //xabab
console.log("x".padEnd(4, "ab")) //xaba
/**
 * 上面代码中，padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
 */
//如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
console.log("xxx".padStart(2, "ab")) //xxx
console.log("xxx".padEnd(2, "ab")) //xxx

//如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
console.log("xx".padStart(3, "abc")) //axx

//如果省略第二个参数，默认使用空格补全长度。
console.log("x".padStart(4)) //'    x'
console.log("x".padEnd(4) + "1") //'x   1'

//padStart的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串。
console.log("1".padStart(10, "0"))//0000000001
console.log("12".padStart(10, "0"))
console.log("1234456".padStart(10, "0"))

//另一个用途是提示字符串格式。
console.log("12".padStart(10, "YYYY-MM-DD"))//YYYY-MM-12
console.log("09-12".padStart(10, "YYYY-MM-DD"))//YYYY-09-12
