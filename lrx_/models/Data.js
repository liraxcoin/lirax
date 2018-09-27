var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DataSchema = new Schema({
    
    firstnumber	: { type : Number,require :true},
    secondnumber: { type : Number ,require :true},
    product:{type:Number ,require:true},
	datetime:{default : Date.now ,type :Date }
});


module.exports = mongoose.model('Data',DataSchema);
