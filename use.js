/**
 * use.js 
 * 用于开放文件夹
 */
let fs = require('fs');
let path = require('path');

let httpSheet = {
	'html': 'text/html',
	'css' : 'text/css',
	'jpg' : 'image/jpeg',
	'js' : 'application/x-javascript',
	'png' : 'image/png',
	'ico' : 'application/x-ico',
	'txt' : 'text/plain'
}
let len ;
let url ;
function use (str,req,res) {
	len = str.length+1;
	url = path.parse(req.url).dir.substring(1,len);
	str = str.toLowerCase();
	if (url === str) {
		if (req.url.indexOf('?') >= 0) {
			res.writeHead(200,{"Content-Type":`text/plain;charset=UTF-8`});
			res.end('没有该文件');
		} else {
			fs.readFile(path.join(__dirname,req.url).toLowerCase(),function (err,data) {
				if (err) throw err;
				let type = httpSheet[path.parse(req.url).ext.substring(1)];
				res.writeHead(200,{"Content-Type":`${ type };charset=UTF-8`});
	
				if (type === 'application/x-ico' || type === 'image/png' ||  type === 'image/jpeg') {
					res.end(data);
				}
				exports.isFile = true;
				res.end(data.toString());
			})
		}
	} else {
		exports.isFile = false;
	}
	return false;
}

exports.use = use;
