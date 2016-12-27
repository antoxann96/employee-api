var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var dbConf = require('../config/connections.js').connections;
var dbData = dbConf[dbConf.mode];


var models = require('../api/models/models.js');
var mongooseModels = {};
for(key in models) {
    mongooseModels[key] = models[key](mongoose);
}

if(dbConf.mode === 'test') {
    console.log('TEST MODE');
    var schema = new mongoose.Schema({
     
        nonRequiredStr: { type: String, required : true },
        requiredStr   : { type: String, required : true }
     
    })
    mongooseModels['testCollection'] = mongoose.model('testCollection', schema);
}

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://employee:12345678@ds145138.mlab.com:45138/employee1', function(err) {
    if(err) {
        console.log('Error: ', err);
    }
});
 
module.exports = mongooseModels;
