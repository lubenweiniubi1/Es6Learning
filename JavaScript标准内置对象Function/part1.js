//每个 JavaScript 函数实际上都是一个 Function 对象。
//运行 (function(){}).constructor === Function // true 便可以得到这个结论。
console.log(function () {}.constructor === Function) //--true
