var mongoose = require('mongoose');
var url = 'mongodb://user:pass@ds027748.mongolab.com:27748/log4420';
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

mongoose.connect(url);

function disconnect() {mongoose.disconnect()}


