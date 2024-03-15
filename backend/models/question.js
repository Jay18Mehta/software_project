const mongoose = require("mongoose")

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
    }
})

const Question = mongoose.model("Question",questionSchema)
module.exports =  Question