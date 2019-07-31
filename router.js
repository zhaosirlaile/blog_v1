/**
 * router 路由表
 */
let path = require('path');
let fs = require('fs');
let use = require('./use');
let model = require('./model');
let querystring = require('querystring');

let url = '';

function router(req,res) {
    
    use.use('node_modules',req,res)
    if (use.isFile === true) return false;
    // console.log(req.url);
    // if(req.url.substring(0,12) === '/public/blog' && req.url.substring(25) !== 'jpg' && path.parse(req.url.substring(25)).ext !== '.png') {
    //     console.log(path.parse(req.url.substring(25)).ext);
    // }
    use.use('public',req,res);
    if (use.isFile === true) return false;

    // 开放 node_modules 文件 、 开放 public 文件
    if (req.url.substring(0,12) === '/getBlogPage') {
        model.GetBlogPage(req,res);
        return false;
    }
    let url = req.url;
    if (url === '/') {
        model.readFile(req,res,'/view/index.html');
    } else if (url.substring(0,6) === '/index') {
        if (url.length > 6) {
            model.Get9(req,res);
        } else {
            model.readFile(req,res,'/view/index.html');
        }
    } else if (url.substring(0,5) === '/blog' ) {
        if (url.length > 5) {
            // 获取 blog 页面的GET请求
            if (url === '/blog/GETType') {
                console.log(req.url);
                model.GetType(req,res);
            } else if (url.substring(0,10) === '/blog?page') {
                model.Get12(req,res,url.substring(11));
            }
        } else {
            // 获取 blog 页面的信息
            model.Get12(req,res,1);
        }
    } else if (url.substring(0,6) === '/login') {
        // 这里是登录页面逻辑处理
        if (url.length > 6) {
            if (url === '/login/enter') {
                // 登录功能
                let data = '';
                req.on('data',function(chunk){
                    data += chunk;
                })
                req.on('end',function(){
                    model.login(req,res,querystring.parse(data)) ;
                })
            } else if (url === '/login/register') {
                // 注册功能
                let data = '';
                req.on('data',function(chunk){
                    data += chunk;
                })
                req.on('end',function(){
                    model.searchEmail(req,res,querystring.parse(data)) ;
                })
            } else if (req.url.substring(0,17) === '/login/getCaptcha') {
                // 验证码功能
                let data = querystring.parse(path.parse(req.url).base.substring(11));
                let captchaNumber = (function captchaNumber(){
                    let num = [];
                    for (let i = 0; i < 6; i++) {
                        num[i] = parseInt(Math.random()*10);
                    }
                    return num.join('');
                })()
                model.sendMail(data.email,captchaNumber);
                res.end(JSON.stringify({
                    'status': 1,
                    'captchaNumber': captchaNumber
                }))
                return false;
            }
        } else {
            // 获取登录页信息
            model.readFile(req,res,'/view/login.html');
        }
    } else if (url === '/regarding') {
        // 这里是 regarding 页面
        model.readFile(req,res,'/view/regarding.html');
    } else if (url === '/works') {
        // 这里是 works 页面
        model.readFile(req,res,'/view/works.html');
    } else if (url.substring(1,8) === 'article'){;
        // 这里是博客的文章
        let dir = req.url.substring(9);
        fs.readFile(path.join(__dirname,'/view/article.html') ,'utf8',function(err,data) {
            if (err) throw err;
            model.updataNumber(dir);
            res.writeHead(200,{"Content-Type":`text/html;charset=UTF-8`});
            res.end(data.replace(/#mySrcLink#/,`/public/blog/${ dir }/${ dir }.txt` ));
        })
    } else if (url.substring(0,7) === '/search') {
        // 这里是搜索功能
        if (Object.keys(querystring.parse(path.parse(req.url).name))[0].substring(1) === 'type') {
            model.searchType(req,res);
        } else {
            model.searchTitle(req,res);
        }
    } else {
        if (url.substring(0,7) !== '/public' && url.substring(0,5) !== '/blog'){
            model.readFile(req,res,'/view/404.html');
        }
    }
}

module.exports = router;