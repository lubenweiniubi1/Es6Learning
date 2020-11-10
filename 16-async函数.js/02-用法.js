/*
基本用法
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

下面是一个例子。
*/
if (0) {
  async function getStockPriceByName(name) {
    var symbol = await getStockSymbol(name)
    var stockPrice = await getStockPrice(symbol)
    return stockPrice
  }

  getStockPriceByName("goog").then(function (result) {
    console.log(result)
  })
}
//上面代码是一个获取股票报价的函数，函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。

// 下面是另一个例子，指定多少毫秒后输出一个值。
if (0) {
  function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  async function asyncPrint(value, ms) {
    await timeout(ms)
    console.log(value)
  }

  asyncPrint("hello world", 1500)
}
//上面代码指定50毫秒以后，输出hello world。

// 由于async函数返回的是 Promise 对象，可以作为await命令的参数。所以，上面的例子也可以写成下面的形式。
if (1) {
  async function timeout(ms) {
    await new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  async function asyncPrint(value, ms) {
    await timeout(ms)
    console.log(value)
  }

  asyncPrint("hello world", 1050)
}
/**
 async 函数有多种使用形式。

// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
 */