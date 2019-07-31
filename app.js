/**
 * app.js 主文件
 */
let http  = require('http');

let router = require('./router');


http.createServer(function(req,res) {
    router(req,res);
}).listen(3000,function(){
    console.log('runing...');
})