/**
 * 变量提升：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部。
 * 相当于把 声明的代码偷偷移到代码最上方
 *
 *  {top} 以下if 语句里面的所有变量都提升到了
 */
if (0) {
  //变量提升,这里相当于有 var x ,
  x = 5 // 变量 x 设置为 5
  console.log(x)
  var x // 声明 x
}

/**
 * JavaScript 初始化不会提升JavaScript 只有声明的变量会提升，初始化的不会。
 */

//以下两个实例结果结果不相同：
if (0) {
  var x = 5 // 初始化 x
  var y = 7 // 初始化 y
  console.log(x + " " + y)
}

var y = 10

if (1) {
  // {position 1} if之外的包裹他的最近方法体顶部，如果没有函数包裹则在文件的最上面，为全局变量
  console.log("-----------------普通代码块--------------")
  {
    var x = 5 // 初始化 x
    console.log(x + " " + y) //输出： 5 undefined

    //这里提升到了 position1
    var y = 7 // 初始化 y， 这是因为变量声明 (var y) 提升了，但是初始化(y = 7) 并不会提升
    //类似于 var y   ==> log ==> y = 7
  }
}

//------>和上面的比较一哈
if (1) {
  var z = 10
  console.log("-----------------函数代码块--------------")
  function f123() {
    //方法体最顶部，var z 提升到了这里 {position2}
    var x1 = 5
    console.log(x1 + " " + z)
    if (0) {
      var z = 10 //{position2}
    }
  }
  f123()
}
