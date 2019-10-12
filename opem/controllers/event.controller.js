var Event = require('../models/Event.model');
var User = require('../models/User.model');

function handler(res, err_msg) {
  return function(err, data) {
    if (err) {
      console.log(err);
      console.log(err_msg);
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  }
}

exports.getEvent = function(req, res, next) {
  Event.findOne({ _id: req.params.id }, handler(res, "That event does not exist in the database"));
};

// Create an event, logs to server console
exports.createEvent = function(req, res, next) {
  var newEvent = new Event();
  
  newEvent.name = req.body.name;
  newEvent.date = req.body.date;
  newEvent.time_start = req.body.time_start;
  newEvent.address = req.body.address;
  
  if (req.body.venue) newEvent.venue = req.body.venue;
  if (req.body.time_end) newEvent.time_end = req.body.time_end;
  if (req.body.description) newEvent.description = req.body.description;
  if (req.body.recurring) newEvent.recurring = req.body.recurring;
  if (req.body.requestable) newEvent.requestable = req.body.requestable;
  
  newEvent.signup_date = req.body.signup_date;
  newEvent.signup_start = req.body.signup_start;
  newEvent.signup_end = req.body.signup_end;
  newEvent.host = req.body.host;
  newEvent.spots = Number(req.body.spots);
  newEvent.attendees = [];
  newEvent.waitlist = [];
  
  newEvent.save(function(err, event) {
    if (err) {
      console.log(err.message);
      res.status(500).send("There was an error creating this event");
    }
    else {
      console.log('Event successfully saved');
      User.update({ _id: req.body.host }, { $push: { hosted_events: event._id }}, function(err, response) {
        if (err) console.log(err);
        else {
          console.log('Event added to users hosted events');
          console.log(response);
        }
      });
      
      res.json(event);
    }
  });
};

exports.updateEvent = function(req, res) {
  Event.update({ _id: req.body.id }, {
    $set: {
      date: req.body.date,
      signup_date: req.body.signup_date,
      time_start: req.body.time_start,
      signup_start: req.body.signup_start,
      time_end: req.body.time_end,
      signup_end: req.body.signup_end,
      location: req.body.location,
      description: req.body.description,
      host: req.body.host,
      attendees: req.body.attendees,
      waitlist: req.body.waitlist,
      spots: req.body.spots,
      recurring: req.body.recurring,
      requestable: req.body.requestable
    }
  }, handler(res, "Event could not be updated"));
};

exports.removeAttendee = function(req, res) {
  Event.update({ _id: req.body.id }, { $pull: { attendees: req.body.user_id }}, function(err, event) {
    if (err) console.log(err);
    else res.json('Attendee successfully removed');
  });
};

exports.addAttendee = function(req, res) {
  Event.update({ _id: req.body.id }, { $push: { attendees: req.body.user_id }}, function(err, event) {
    if (err) console.log(err);
    else res.json('Attendee successfullly added');
  });
}

exports.addGeocode = function(req, res) {
  console.log(req.body);
  Event.update({ _id: req.params.id }, { $set: { geocode: req.body.geocode }}, function(err, event) {
    if (err) console.log(err);
    else res.status(200).json('Geocode added successfully');
  });
};

exports.deleteEvent = function(req, res) {
  Event.findOneAndRemove({ _id: req.params.id }, handler(res, "Event could not be deleted"));
};

// returns events hosted by currently logged in user
exports.hostedEvents = function(req, res) {
  Event.find({ host: req.params.id }).lean().sort({ date: 1 }).exec(handler(res, "Event could not be found"));
};

exports.getAll = function(req, res) {
  Event.find({}, 'name -_id').lean().exec(handler(res, "There was an error retrieving events"));
};

// allows guest to sign up for event. 
exports.guestSignUp = function(req, res) {
  Event.find({ _id: req.body.event_id }, { $push: { attendees: req.body.name }}, handler(res, "There was a problem registering guest"));
};

// search for events by name and location. Just add documents to the array to search for other parameters (like VENUE)
exports.eventSearchName = function(req, res) {
  if (!req.body.name) res.status(404);
  var rgx = new RegExp(req.body.name, 'i');
  Event.find({ $or: [{ name: rgx }, { venue: rgx }] }, handler(res, "Internal server error"));
};