const mongoose = require("mongoose")
const Question = require("./question")

const userSchema  = new mongoose.Schema({
    username : {
        type : String,
        required :true,
        unique : false,
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ],
    bookmarked_questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ], 
    upvoted_questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ], 
    downvoted_questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ], 
})

const User = mongoose.model("User",userSchema)
module.exports =  User