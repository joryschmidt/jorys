var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  },
  events: [{ type: Schema.ObjectId, ref: 'Event' }],
  hosted_events: [{ type: Schema.ObjectId, ref: 'Event' }],
  gravatar: String
});

module.exports = mongoose.model('User', UserSchema);