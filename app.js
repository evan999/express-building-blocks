var http = require('http');
var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

// Static middleware
app.use(express.static('public'));


app.get('/blocks', function(request, response){
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.json(blocks);
});

/*
app.get('/blocks', function(request, response){
   response.redirect(301, '/parts'); 
});
*/



app.listen(process.env.PORT, process.env.IP, 8080, function(){
    console.log('Listening on port 8080');
});

