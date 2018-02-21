var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();

app.get('/', function(request, response) {
 response.sendFile(__dirname + '/index.html');
});

app.get('/games', function(request, response) {
 fs.readFile('games.json', 'utf8', function(err, data) {
 var games = JSON.parse(data);
 response.locals = { games: games };
 response.render('games.ejs');
 });
});

app.get('/games/:id', function(request, response) {
  fs.readFile('games.json', 'utf8', function(err, data) {
    var gamesParsed = JSON.parse(data);
    var game = gamesParsed.filter( function(obj) {
      return obj.id === parseInt(request.params.id);
    });

    if (game.length)
      game = game[0];
    else
      game = null;

    response.locals = { game: game };
    response.render('game.ejs');
 });
});


app.listen(8000);
