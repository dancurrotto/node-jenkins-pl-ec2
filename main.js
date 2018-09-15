const cities = require('cities');
const url = require('url');
const http = require('http');

const app = http.createServer(function (request, response) {
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
})

var server = app.listen(3000, function(){
  console.log('Server is running on port 3000');
});

exports.closeServer = function(){
  server.close();
};



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
