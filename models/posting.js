var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Posting = new Schema({
    pid: String,
    category: String,
    date: { type: Date },
    location: String,
    title: String,
    url: String,
    acknowledged: Boolean
}, {
    collection: 'posting'
});

module.exports = mongoose.model('posting', Posting);