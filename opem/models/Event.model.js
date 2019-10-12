var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = require('./Event.model');

var SpotSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  },
  spot: {
    type: Number
  },
  special_requests: {
    type: String
  }
});

var EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  geocode: {
    type: Schema.Types.Mixed,
  },
  date: {
    type: Date,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  time_start: {
    type: Date,
    required: true
  },
  time_end: {
    type: Date
  },
  signup_start: {
    type: Date, 
    required: true
  },
  signup_end: {
    type: Date,
    required: true
  },
  location: {
    type: String
  },
  venue: {
    type: String
  },
  description: {
    type: String
  },
  host: { type: Schema.ObjectId, ref: 'User', required: true },
  attendees: [SpotSchema],
  waitlist: [SpotSchema],
  spots: {
    type: Number,
    required: true
  },
  // Recurring means weekly
  recurring: {
    type: Boolean,
    default: false
  },
  requestable: {
    type: Boolean,
    default: false
  },
  event_type: {
    comedy: Boolean,
    music: Boolean,
    other: Boolean
  }
});

module.exports = mongoose.model('Event', EventSchema);