const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const port = 80

const Question =  require("./models/question")
const User = require("./models/user") 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/software_project');
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/software_project/questions",async(req,res)=>{
    try{
        const questions = await Question.find()
        console.log(questions)
        res.json(questions)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }  
})

app.post("/software_project/addQuestions",async(req,res)=>{
  try{
      const  {question,options,correct,email} = req.body
      console.log(req.body)
      const user = await User.findOne({email:email})
      const question_object = new Question({question:question,options:options,correct:correct,user:user})
      await question_object.save()
      user.questions.push(question_object)
      await user.save()
      console.log(question_object)
      res.json(req.body)
  }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/login",async(req,res)=>{
  try{
    const {username , email} = req.body
    console.log(req.body)
    const user = await User.findOne({username:username,email:email})
    console.log(user)
    if(!user){
      const new_user = new User({username:username,email:email})
      await new_user.save()
      console.log(new_user)
      res.json(new_user)
    }
    res.json(user)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})