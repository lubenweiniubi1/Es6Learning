//该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
//Object.getPrototypeOf(obj);

function Rectangle() {}

var rec = new Rectangle()

console.log(Object.getPrototypeOf(rec) === Rectangle.prototype)
console.log(Object.getPrototypeOf(rec)) //Rectangle {}
console.log(Object.prototype) //{}
Object.setPrototypeOf(rec,Object.prototype)
console.log(Object.getPrototypeOf(rec)) //{}

