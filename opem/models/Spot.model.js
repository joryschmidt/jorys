var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Spot', SpotSchema);





// This file may be unnecessary. 