const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
mongoose.connect('mongodb+srv://shakib:shakib10@cluster0.iquyc.mongodb.net/info?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var conn =mongoose.Collection;
var passSchema =new mongoose.Schema({
    password_category: {type:String, 
        },
        project_name: {type:String, 
            required: true,
           },
        password_detail: {type:String, 
            required: true,
           },
    date:{
        type: Date, 
        default: Date.now }
});
passSchema.plugin(mongoosePaginate);
var passModel = mongoose.model('password_details', passSchema);
module.exports=passModel;