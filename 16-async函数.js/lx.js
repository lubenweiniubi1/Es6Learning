const fs = require("fs")
const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

if (1) {
  async function a() {
    console.time('test')

    // const s1 = await readFile("../15-Generator函数的异步应用/file1.md")
    // const s2 = await readFile("../15-Generator函数的异步应用/file2.md")
    await Promise.all([readFile("../15-Generator函数的异步应用/file1.md"),readFile("../15-Generator函数的异步应用/file2.md")])
  
    console.timeEnd('test')
  }
  a()
}
