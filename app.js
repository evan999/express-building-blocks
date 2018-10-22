var http = require('http');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var logger = require('./logger');
app.use(logger);

var blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};



app.get('/blocks', function(request, response){
   response.json(Object.keys(blocks)); 
});

var locations = {
    'Fixed': 'First floor', 
    'Movable': 'Second floor', 
    'Rotating': 'Penthouse'
}

app.param('name', function(request, response, next){
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    
    request.blockName = block;
    
    next();
    
});



// Static middleware
app.use(express.static('public'));



app.get('/blocks/:name', function(request, response){
    //var blocks = ['Fixed', 'Movable', 'Rotating'];
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    var description = blocks[request.blockName];
    
    var description = blocks[request.params.name];
    
    if(!description){
        response.status(404).json('No description found for ' + request.params.name);
    }
    else{
        response.json(description);
    }
});

app.get('/locations/:name', function(request, response){
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    var location = locations[request.blockName];
    
});

app.delete('/blocks/:name', function(request, response){
   delete blocks[request.blockName];
   response.sendStatus(200);
});

app.post('/blocks', parseUrlencoded, function(request, response){
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;
    
    response.status(201).json(newBlock.name);
});

app.listen(process.env.PORT, process.env.IP, 8080, function(){
    console.log('Listening on port 8080');
});



