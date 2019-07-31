let db = require('./db');
let fs = require('fs');
let path = require('path');
let querystring = require('querystring');
let sendEmail = require('./sendmail');


let blogPage;

exports.readFile = function(req,res,fileAddress) {
    fs.readFile(path.join(__dirname,fileAddress) ,'utf8',function(err,data) {
        if (err) throw err;
        res.writeHead(200,{"Content-Type":`text/html;charset=UTF-8`});
        res.end(data);
    })
}

exports.GetBlogPage = function (req,res) {
    db('select aID from article',[],function(results,fields){
        blogPage = Math.ceil(results.length/12);
        res.end(JSON.stringify(blogPage));
    })
}
exports.result = '';
let baseNumber;
exports.Get9 = function(req,res) {
    let baseNumber,otherNumber;
    baseNumber = parseInt(querystring.parse(path.parse(req.url).name)['GET?baseNumber']);
    db('select * from article order by aTime desc limit ?,?',[baseNumber, 9],function(results,fields){
        res.end(JSON.stringify(results));
    })
}
exports.GetType = function(req,res) {
    db('select distinct aType from article',[],function(results,fields){
        res.end(JSON.stringify(results));
    })
}
exports.Get12 = function(req,res,page) {
    let str = '';
    let baseNumber = (page-1) * 12
    db('select * from article order by aTime desc limit ?,?',[baseNumber,12],function(results,fields){
        for(let i = 0 ; i < results.length; i++ ){
            let myTime = results[i].aTime;
            let item = `
                <div class = 'item' data-ahref = ${ results[i].aHref }>
                    <img src="${ results[i].aImg }" alt="图片">
                    <div class="label">
                        ${ results[i].aType }
                    </div>
                    <div class="information">
                        <h2 class="title">${ results[i].aTitle }</h2>
                        <p class="time">${  myTime.getFullYear() + '-' + (myTime.getMonth() + 1) + '-' + myTime.getDate() }</p>
                    </div>
                </div>
            `
            str += item;
        }

        fs.readFile(path.join(__dirname,'/view/blog.html') ,'utf8',function(err,data) {
            if (err) throw err;
            data = data.replace('#replaceDOM#',str);
            res.writeHead(200,{"Content-Type":`text/html;charset=UTF-8`});
            res.end(data);
        })
    })
}
exports.searchType = function(req,res) {
    let str = '';
    let url = querystring.parse(path.parse(req.url).name.substring(1));
    db(`select * from article where aType = ? `,[url.type],function(results,fields){
        fs.readFile(path.join(__dirname,'/view/blog.html'),function(err,data) {
            if (err) throw err;
            for (let i = 0 ; i < results.length; i++) {
                let myTime = results[i].aTime;
                str += `<div class="item" data-ahref = ${ results[i].aHref }>
                            <img src="${ results[i].aImg }" alt="图片">
                            <div class="label">
                                ${ results[i].aType }
                            </div>
                            <div class="information">
                                <h2 class="title">${ results[i].aTitle }</h2>
                                <p class="time">${ myTime.getFullYear() + '-' + (myTime.getMonth() + 1) + '-' + myTime.getDate() }</p>
                            </div>
                        </div>`;
            }
            res.end((data.toString()).replace(/#replaceDOM#/,str));
        })

    })
}
exports.searchTitle = function(req,res) {
    let str = '';
    let url = querystring.parse(path.parse(req.url).name.substring(1));
    db(`select * from article where aTitle like ? `,['%' + url.title + '%'],function(results,fields){
        fs.readFile(path.join(__dirname,'/view/search.html'),function(err,data) {
            if (err) throw err;
            for (let i = 0 ; i < results.length; i++) {
                let myTime = results[i].aTime;
                str += `<div class="item" data-ahref = ${ results[i].aHref }>
                            <img src="${ results[i].aImg }" alt="图片">
                            <div class="label">
                                ${ results[i].aType }
                            </div>
                            <div class="information">
                                <h2 class="title">${ results[i].aTitle }</h2>
                                <p class="time">${ myTime.getFullYear() + '-' + (myTime.getMonth() + 1) + '-' + myTime.getDate() }</p>
                            </div>
                        </div>`;
            }
            res.end((data.toString()).replace(/#searchList#/,str));
        })

    })
}
//发送验证码
exports.sendMail = function(emailAddress,myNumber){
    // console.log(emailAddress,myNumber);
    let email = {
        title: '赵sir的个人博客网站---邮箱验证码',
        htmlBody: `
                <h1>您好：</h1>
                <p style="font-size: 18px;color:#000;">
                    您的验证码为：
                    <span style="font-size: 16px;color:#1890ff;"> ${myNumber}， </span>
                    您当前正在赵sir的个人博客网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
                </p>
                <p style="font-size: 14px;color:#666;">60秒内有效</p>
                `
    };
    let mailOptions = {
        from: 'zhaosirlaile@qq.com', // 发件人地址
        to: emailAddress, // 收件人地址，多个收件人可以使用逗号分隔
        subject: email.title, // 邮件标题
        html: email.htmlBody // 邮件内容
    };
    sendEmail.send(mailOptions)
}
//发送验证码
exports.searchEmail = function(req,res,body) {
    db('select uEmail from user where uEmail = ? ',[body['e-mail']],function(results,fields){
        if (results.length === 0) {
            console.log(body['e-mail'],body['onepassword'].toString());
            db('insert into user(uEmail,uPassword) values(?,?)',[body['e-mail'].toString(),body['onepassword'].toString()],function(results,fields){
                res.end(JSON.stringify({
                    status: 1
                }));
            })
        } else {
            res.end(JSON.stringify({
                status: -1
            }));
        }
    })
}
exports.login = function (req,res,body) {
    // console.log(body);
    db('select uEmail from user where uEmail = ? && uPassword= ? ',[body['e-mail'],body['onepassword']],function(results,fields){
        if (results.length === 0) {
            res.end(JSON.stringify({
                status: 0
            }));
        } else {
            res.end(JSON.stringify({
                status: 1
            }));
        }
    })
}
exports.updataNumber = function (str) {
    db('update article set aNumber = aNumber + 1 where aHref like ?',[`%${ str }%`],function(results,fields){
        console.log('成功');
    })
}

