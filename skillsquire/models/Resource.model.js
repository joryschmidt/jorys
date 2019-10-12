var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  long_description: {
    type: String
  },
  link: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#cccccc'
  },
  logo: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  numRatings: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  },
  className: {
    type: String,
    lowercase: true, 
    unique: true
  },
  categories: [String],
  reviews: [{ type: Schema.ObjectId, ref: 'Review' }]
});

var db = mongoose.connection.useDb('ssq');

module.exports = db.model('Resource', ResourceSchema);