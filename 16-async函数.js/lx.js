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
    console.time("继发")

    const s1 = await readFile("../15-Generator函数的异步应用/file1.md")
    const s2 = await readFile("../15-Generator函数的异步应用/file2.md")

    console.timeEnd("继发")

    console.time("并发")

    await Promise.all([
      readFile("../15-Generator函数的异步应用/file1.md"),
      readFile("../15-Generator函数的异步应用/file2.md"),
    ])

    const s3 = readFile("../15-Generator函数的异步应用/file1.md")
    const s4 = readFile("../15-Generator函数的异步应用/file2.md")

    await s3
    await s4
    console.timeEnd("并发")

    const arr = [
      "../15-Generator函数的异步应用/file1.md",
      "../15-Generator函数的异步应用/file2.md",
    ]

    for (let url of arr) {
      //继发
      const res = await readFile(url)
    }
  }
  a()
}
