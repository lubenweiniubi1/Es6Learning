/**
 * Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，
 * 与字符串的includes方法类似。
 * 该方法属于ES7，但Babel转码器已经支持。
 */
console.log([1, 2, 3].includes(2)) //t
console.log([1, 2, 3].includes(4)) //f
console.log([1, 2, NaN].includes(NaN)) //t

//indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，
//所以要去比较是否不等于-1，表达起来不够直观。
//二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判。
console.log(NaN === NaN) //false
