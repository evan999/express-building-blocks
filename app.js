var http = require('http');
var express = require('express');
var app = express();


app.get('/', function(request, response){
// response.send('Hello world');
   response.write('Hello world');
   response.end();
});

app.get('/blocks', function(request, response){
    //var blocks = ['Fixed', 'Movable', 'Rotating'];
    var blocks = '<ul><li>Fixed</li><li>Movable</li></ul>';
    //response.send(blocks);
    response.send(blocks);
});

app.get('/blocks', function(request, response){
   response.redirect(301, '/parts'); 
});

app.listen(process.env.PORT, process.env.IP, 8080, function(){
    console.log('Listening on port 8080');
});

