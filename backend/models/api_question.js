const mongoose = require("mongoose")

const api_questionSchema  = new mongoose.Schema({
    question : {
        type : String,
        required :true,
        unique : true,
    },
    options : [{
        type : String,
        required :true,
        minItems: 2,
        maxItems: 4,
    }],
    correct:{
        type : String,
        required : true
    },
    id:{
        type:String,
        required:true
    }
})

const Api_Question = mongoose.model("Api_Question",api_questionSchema)
module.exports =  Api_Question