var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Log', LogSchema);
