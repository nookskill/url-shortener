var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

var urlSchema = new Schema({
    _id: {type: Number, index: true},
    long_url: String,
    created_at: Date
});

urlSchema.pre('save', function(next){
    var doc = this;
        //if _id is undefined will add _id by seq
        if(doc._id == null){
            counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
                if (error)
                    return next(error);
                doc.created_at = new Date();
                doc._id = counter.seq;
                next();
            });
        }else {
            doc.created_at = new Date();
            next();
        }
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;