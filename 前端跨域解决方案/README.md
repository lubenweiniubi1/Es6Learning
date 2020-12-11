## 跨域解决方案

### 1.jsonP

**jsonp**的原理就是利用`<script>`标签没有跨域限制，通过`<script>`标签src属性，发送带有callback参数的GET请求，服务端将接口返回数据拼凑到callback函数中，返回给浏览器，浏览器解析执行，从而前端拿到callback函数返回的数据。

动态生成script标签，通过src属性加载

 ````html
 <script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
    document.head.appendChild(script);

    // 回调执行函数
    function handleCallback(res) {
        alert(JSON.stringify(res));
    }
 </script>
 ````

缺点： 只支持GET请求



### 2.中间服务器代理

```
前端部署地址 127.0.0.1:8000

中间服务器： 127.0.0.1:8000

目标服务器地址： 127.0.0.1:8888
```



前端访问中间服务器

### 3.CORS跨域资源共享

服务器端进行配置，加一个响应头。

```js
"Access-Control-Allow-Origin"
```

这个是服务端添加，如果没有前端怎么解决。



### 4.反向代理配置

