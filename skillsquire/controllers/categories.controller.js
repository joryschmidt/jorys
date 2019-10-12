var Categories = require('../models/Categories.model');

// Get array of categories from database
exports.getAll = function(req, res) {
  Categories.findOne({ _id: 'categories' }, function(err, cats) {
    if (err) res.status(404).end();
    else res.json(cats);
  });
};

// Add a category to the database array and sort it alphabetically
exports.addCategory = function(req, res) {
  Categories.update({ _id: 'categories' }, { $push: { categories: { $each: [req.body.cat], $sort: 1 }}}, function(err, response) {
    if (err) {
      console.log(response);
      res.status(500).end();
    }
    else {
      console.log(response);
      res.status(200).end();
    }
  });
};

// Remove a category from database array
exports.removeCategory = function(req, res) {
  Categories.update({ _id: 'categories' }, { $pull: { categories: req.body.cat }}, function(err, response) {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    else {
      console.log(response);
      res.status(200).end();
    }
  });
};