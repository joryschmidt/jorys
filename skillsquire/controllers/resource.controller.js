var Resource = require('../models/Resource.model');
var Queue = require('../models/Queue.model');
var User = require('../models/User.model');
var Review = require('../models/Review.model');

// Create a new resource -- Admin function
exports.create = function(req, res) {
  
  var className = req.body.name.replace(/[ .]/g, '');
  
  var link = req.body.link;
  if (link.search(/^http/) == -1) link = 'http://' + link;
  
  var newResource = new Resource();
  newResource.name = req.body.name;
  newResource.description = req.body.description;
  newResource.long_description = req.body.long_description;
  newResource.link = link;
  newResource.color = req.body.color;
  newResource.logo = req.body.logo;
  if (req.body.rating) newResource.rating = Number(req.body.rating);
  newResource.className = className;
  
  newResource.save(function(err, resource) {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating resource. Perhaps try making sure your fields are valid.");
    } else {
      console.log(resource);
      res.json(resource);
    }
  });
};

// Add a resource to the queue
exports.queue = function(req, res) {
  var newQueue = new Queue();
  newQueue.name = req.body.name;
  newQueue.link = req.body.link;
  newQueue.color = req.body.color;
  newQueue.description = req.body.description;
  newQueue.user = req.body.user;
  newQueue.className = req.body.name.replace(/[ .]/g, '');
  
  // This function exists in the resource controller instead of the user controller because of its interaction with the queue
  // Update the users custom resource list and save it to the queue
  User.update({ username: req.body.user }, { $push: { customResourceList: { $each: [newQueue], $position: 0 }}}, function(err, response) {
    if (err) {
      console.log(err);
      res.status(500).send('There was an error saving your resource');
    } else {
      console.log(newQueue);
      newQueue.save(function(err, q) {
        if (err) {
          console.log(err.message);
          res.json(newQueue);
        }
        else {
          console.log(q);
          res.json(q);
        }
      });
    }
  });
};

// Get the queue of proposed resources -- Admin function
exports.getQueue = function(req, res) {
  Queue.find().exec(function(err, q) {
    if (err) console.log(err);
    else res.json(q);
  });
};

// Remove resource from queue -- Admin function
exports.removeQueueItem = function(req, res) {
  Queue.findOneAndRemove({ _id: req.params.id }, function(err, q) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(q.name, 'deleted');
      res.status(200).send(q);
    }
  });
};

// Get all resources
exports.getAll = function(req, res) {
  Resource.find().sort({ rating: -1 }).exec(function(err, resources) {
    if (err) console.log(err);
    else res.json(resources);
  });
};

// Get one resource
exports.getOne = function(req, res) {
  Resource.findOne({ _id: req.params.id }, function(err, resource) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.json(resource);
    }
  });
};

// Edit a resource -- Admin function
exports.editResource = function(req, res) {
  Resource.update({ _id: req.params.id }, { $set: {
    description: req.body.description,
    long_description: req.body.long_description,
    categories: req.body.categories,
    color: req.body.color,
    name: req.body.name,
    link: req.body.link,
    logo: req.body.logo
  }}, function(err, response) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(response);
      res.status(200).end();
    }
  });
};

// Delete a resource -- Admin function
exports.deleteResource = function(req, res) {
  Resource.findOneAndRemove({ _id: req.params.id }, function(err, resource) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(resource.name, 'has been deleted.');
      res.status(200).end();
    }
  });
};

// Add a category to a resource -- Admin function
exports.addCategory = function(req, res) {
  Resource.update({ _id: req.params.id }, { $addToSet: { categories: req.body.cat }}, function(err, raw) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(raw);
      res.status(200).end();
    }
  });
};

// Remove a category from a resource -- Admin function
exports.removeCategory = function(req, res) {
  Resource.update({ _id: req.params.id }, { $pull: { categories: req.body.cat }}, function(err, raw) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(raw);
      res.status(200).end();
    }
  });
};

// Create a new review
exports.writeReview = function(req, res) {
  var review = new Review();
  review.user = req.body.user;
  review.resource = req.body.resource;
  review.text = req.body.text;
  review.rating = Number(req.body.rating);
  
  review.save(function(err, review) {
    if (err) {
      console.log(err);
      res.status(500).send("Error writing review");
    } else {
      console.log(review);
      res.json(review);
    }
  });
};

exports.getReviews = function(req, res) {
  Review.find({ resource: req.params.id }).sort({ created: -1 }).exec(function(err, reviews) {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving reviews");
    } else {
      console.log('Reviews: ' + reviews);
      res.json(reviews);
    }
  });
};