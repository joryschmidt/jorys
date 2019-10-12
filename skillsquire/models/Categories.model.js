var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
  _id: String,
  categories: [{ type: String }]
});

var db = mongoose.connection.useDb('ssq');

module.exports = db.model('Categories', CategoriesSchema);