const mongoose = require("mongoose")
const User = require("./user")

const questionSchema  = new mongoose.Schema({
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
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Question = mongoose.model("Question",questionSchema)
module.exports =  Question