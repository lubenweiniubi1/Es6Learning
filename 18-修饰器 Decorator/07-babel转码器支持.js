// Babel转码器的支持
// 目前，Babel转码器已经支持Decorator。

// 首先，安装babel-core和babel-plugin-transform-decorators。由于后者包括在babel-preset-stage-0之中，所以改为安装babel-preset-stage-0亦可。

// $ npm install babel-core babel-plugin-transform-decorators
// 然后，设置配置文件.babelrc。

// {
//   "plugins": ["transform-decorators"]
// }
// 这时，Babel就可以对Decorator转码了。

// 脚本中打开的命令如下。

// babel.transform("code", {plugins: ["transform-decorators"]})
// Babel的官方网站提供一个在线转码器，只要勾选Experimental，就能支持Decorator的在线转码。