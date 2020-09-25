const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shakib:shakib10@cluster0.iquyc.mongodb.net/info?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var conn =mongoose.Collection;
var passcatSchema =new mongoose.Schema({
    password_cat: {type:String,
        required: true,
        index: {
            unique: true,
        }},

    date:{
        type: Date,
        default: Date.now }
});

var passcatModel = mongoose.model('password_category', passcatSchema);
module.exports=passcatModel;