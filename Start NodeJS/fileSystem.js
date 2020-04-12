const hostname = '127.0.0.1';
const port = 3000;
var http = require('http');
var fs = require('fs');
var router =require('./routes')
http.createServer(function(req, res) {
  // fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    // res.write(data);
    console.log("server is running...")
    res.end();
  // });


  // fs.appendFile('mynewfile1.txt', 'Hello content!', function(err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });


  // fs.open('mynewfile2.txt', 'w', function(err, file) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });


  // fs.writeFile('mynewfile3.txt', 'Hello content!', function(err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });

  // fs.unlink('mynewfile1.txt', function(err) {
  //   if (err) throw err;
  //   console.log('File deleted!');
  // });

}).listen(port, hostname);
