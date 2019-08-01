var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app)

var requestPort = 8001;  // 响应请求的页面跑在3001端口

console.log(__dirname + '/staticRes')
app.use(express.static(__dirname + '/staticRes'));

server.listen(requestPort,'0.0.0.0',function(){
    // server.close(function(){
    //   server.listen(8001,'192.168.0.202')
    // })
})