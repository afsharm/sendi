var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema   = new Schema({
	destinations: String,
	is_silent: Boolean,
	os_list: String,
	message: String,
	type: String,
	occurance: { type: Date },
    name: String,
});

module.exports = mongoose.model('Log', LogSchema);
