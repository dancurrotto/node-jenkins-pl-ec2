const cities = require('cities');
const url = require('url');
const http = require('http');


http.createServer(function (request, response) {
    var city = '';
    var query = url.parse(request.url, true).query;
    if (query.zipCode)
    {
      city = cities.zip_lookup(query.zipCode).city;
    }
    else 
    {
      city = "not found";
    }

    var html = '<h1>' + city + '</h1>';
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<html><body><h1>The city is ' + city + '</h1></body></html>');
}).listen(3000);

// Console will print the message
console.log('Server running at http://127.0.0.1:3000');





/*
const app = http.createServer(function(request, response) {
  var city, query;
  query = url.parse(request.url, true).query;
  if (query.zipCode) city = cities.zip_lookup(query.zipCode).city;
  else city = "not found"
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(${city});
  response.end();
});

app.listen(3000);
*/
