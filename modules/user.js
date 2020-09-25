const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shakib:shakib10@cluster0.iquyc.mongodb.net/info?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
    username: {type:String, 
        required: true,
        index: {
            unique: true,        
        }},

        email: {
        type:String, 
        required: true,
        index: {
            unique: true, 
        },},
        password: {
        type:String, 
        required: true
    },
    date:{
        type: Date, 
        default: Date.now }
});

var userModel = mongoose.model('users', userSchema);
module.exports=userModel;