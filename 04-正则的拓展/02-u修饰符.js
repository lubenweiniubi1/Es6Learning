/**
 * ES6对正则表达式添加了u修饰符，含义为“Unicode模式”，
 * 用来正确处理大于\uFFFF的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码。
 */

console.log(/^\uD83d/u.test("\uD83d\udc2a")) //false
console.log(/^\uD83d/.test("\uD83d\udc2a")) //true
/**
 * 上面代码中，\uD83D\uDC2A是一个四个字节的UTF-16编码，代表一个字符。
 * 但是，ES5不支持四个字节的UTF-16编码，会将其识别为两个字符，导致第二行代码结果为true。
 * 加了u修饰符以后，ES6就会识别其为一个字符，所以第一行代码结果为false。
 *  一旦加上u修饰符号，就会修改下面这些正则表达式的行为。
 */

/**
 * （1）点字符
       点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符。
 */
var s = "𠮷"
console.log(/^.$/.test(s)) //false
console.log(/^.$/u.test(s)) //true
//上面代码表示，如果不添加u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。

/**
 * （2）Unicode字符表示法
        ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上u修饰符，才能识别。
 */

console.log(/\u{61}/.test('a'))//false
console.log(/\u{61}/u.test('a'))// true
console.log(/\u{20bb7}/u.test('𠮷'))//true
//上面代码表示，如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配61个连续的u。


/**
 * （3）量词
    使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的Unicode字符。
 */
console.log(/a{2}/.test('aa'))//true
console.log(/a{2}/u.test('aa'))//true
console.log(/𠮷{2}/.test('𠮷𠮷'))//false
console.log(/𠮷{2}/u.test('𠮷𠮷'))//true
//另外，只有在使用u修饰符的情况下，Unicode表达式当中的大括号才会被正确解读，否则会被解读为量词。
console.log(/^\u{3}$/.test(`uuu` ) )//true
