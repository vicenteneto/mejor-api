var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.json(articles);
  });
});
