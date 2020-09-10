//箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。
//但是，箭头函数并不适用于所有场合，
//所以ES7提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用。
//虽然该语法还是ES7的一个提案，但是Babel转码器已经支持。