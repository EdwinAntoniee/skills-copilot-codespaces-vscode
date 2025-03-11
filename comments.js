// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var comments = [];
var server = http.createServer(function(req, res) {
  if (req.url === '/favicon.ico') {
    return res.end();
  }
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        return res.end('404 Not Found');
      }
      res.end(data);
    });
  } else if (pathname === '/loadComments') {
    var data = JSON.stringify(comments);
    res.end(data);
  } else if (pathname === '/addComment') {
    var str = '';
    req.on('data', function(chunk) {
      str += chunk;
    });
    req.on('end', function() {
      var comment = qs.parse(str);
      comments.push(comment);
      res.end('success');
    });
  } else {
    fs.readFile('.' + pathname, function(err, data) {
      if (err) {
        return res.end('404 Not Found');
      }
      res.end(data);
    });
  }
});
server.listen(3000, function() {
  console.log('server is running');
});