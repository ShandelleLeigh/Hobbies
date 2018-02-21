var express = require('express');
var router = express.Router();
var Game = require('../models').Game;


/*PUT stuff*/

router.put('/:id', function(req, res) {
  Game.update(
    { title: req.body.title },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/games');
  })
});

/* GET game listings. */
router.get('/', function(req, res) {
  Game.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
  .then( function(games) {
      return res.render('edit', { game: game });
  });
});

module.exports = router;

/* POST add game listing */
router.post('/', function(req, res) {
  var title = req.body.title;
  Game.create({ title: title })
    .then( function() {
      res.redirect('/games');
  });
});

/* DELETE game listing */
router.delete('/:id', function(req, res) {
  Game.findById(req.params.id)
    .then( function(game) {
      game.destroy()
    })
    .then( function() {
      return res.redirect('/games');
  });
});
