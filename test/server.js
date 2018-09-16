var expect  = require('chai').expect;
var request = require('request');
var server = require("../main.js");

var url = '';
/*
it('Testing Clearwater Zip Code', 
   function(done) {
    url = "http://127.0.0.1:3000/?zipCode=33756";
    request(url , function(error, response, body) {
        expect(body).to.equal('<html><body><h1>The city is Clearwater</h1></body></html>');        
        server.closeServer();
        done();
    });
});

it('Testing West Hollywood Zip Code', 
   function(done) {
    url = "http://127.0.0.1:3000/?zipCode=90046";

    request(url , function(error, response, body) {
        expect(body).to.equal('<html><body><h1>The city is Los Angeles</h1></body></html>');        
        server.closeServer();
        done();
    });
});
*/

it('Testing Upper East Side Zip Code', 
   function(done) {
    url = "http://127.0.0.1:3000/?zipCode=10021";

    request(url , function(error, response, body) {
        expect(body).to.equal('<html><body><h1>The city is New York</h1></body></html>');
        server.closeServer();
        done();
    });
});
