var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title : String,
	body : String
});

module.exports = mongoose.model('testblogs',schema);