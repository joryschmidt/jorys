var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QueueSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  className: { 
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  link: String,
  color: String,
  description: String,
  user: String
  
  // think about keeping track of instances of users adding resource
});

var db = mongoose.connection.useDb('ssq');

exports = module.exports = db.model('Queue', QueueSchema);
exports.schema = QueueSchema;