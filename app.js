var http = require('http');
var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

var blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

// Static middleware
app.use(express.static('public'));



app.get('/blocks/:name', function(request, response){
    //var blocks = ['Fixed', 'Movable', 'Rotating'];
    var description = blocks[request.params.name];
    
    if(!description){
        response.status(404).json('No description found for ' + request.params.name);
    }
    else{
        response.json(description);
    }
    /*
    if(request.query.limit >= 0){
        response.json(blocks.slice(0, request.query.limit));
    }
    else{
    response.json(blocks);
    }
    */
});

app.listen(process.env.PORT, process.env.IP, 8080, function(){
    console.log('Listening on port 8080');
});



