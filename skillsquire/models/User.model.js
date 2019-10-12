var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Queue = require('./Queue.model');
var QueueSchema = Queue.schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  admin: {
    type: Boolean,
    default: false
  },
  joined: {
    type: Date,
    default: Date.now
  },
  resourceList: [{ type: Schema.ObjectId, ref: 'Resource' }],
  customResourceList: [QueueSchema],
  ratings: {},
  reviews: [{ type: Schema.ObjectId, ref: 'Review' }]
});

var db = mongoose.connection.useDb('ssq');

module.exports = db.model('User', UserSchema);