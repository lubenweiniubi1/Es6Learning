//箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。
//但是，箭头函数并不适用于所有场合，
//所以ES7提出了“函数绑定”（function bind）运算符，
//用来取代call、apply、bind调用。
//虽然该语法还是ES7的一个提案，但是Babel转码器已经支持。

/**
 * 函数绑定运算符是并排的两个双冒号（::），
 * 双冒号左边是一个对象，右边是一个函数。
 * 该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。
  foo::bar;
  // 等同于
  bar.bind(foo);
 
  foo::bar(...arguments)
  //等同于
  bar.apply(foo,arguments)
 */

// 都报错 ，操了 下次再说