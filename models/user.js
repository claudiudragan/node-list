let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    id:{
        type: Number,
        require: true
    },
    name:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    street:{
        type: String,
        required: true
    },
    suite:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    zipcode:{
        type: String,
        required: true
    },
    lat:{
        type: String,
        required: true
    },
    lng:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    companyCatchphrase:{
        type: String,
        required: true
    },
    companyBs:{
        type: String,
        required: true
    },
});

let User = module.exports = mongoose.model('User', userSchema);