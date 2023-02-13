const http = require('http');
const fs = require('fs');
const url = require('url')

let page404;
    fs.readFile('./404.html', (err, data) => {
      page404 = data;
    });

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname + ".html";
  
    if (q.pathname != '/index.html' 
    && q.pathname != ""
    && q.pathname != " "
    && q.pathname != '/'){
        fs.readFile(filename, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(page404)
                res.end();
            } 
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
  
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);

