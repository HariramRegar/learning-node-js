// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
// var dt = require('./DateTimeModule');
// const url = require('url');
//
// const server = http.createServer((req, res) => {
//   res.setHeader('Content-Type', 'text/plain');
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write("url: "+req.url);
//   res.write("The date and time are currently:\n " + dt.myDateTime());
//   var q = url.parse(req.url, true).query;
//   var txt = q.year + " " + q.month;
//   res.end(txt);
//   res.end('Hello Duniya!!!');
// });
// console.log("http://"+hostname+":"+port+"/")
//
// server.listen(port, hostname);
let http = require('http');
let router = require('./routes');

var handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

};

http.createServer(router.handleRequest).listen(3000);
