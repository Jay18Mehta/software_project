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

app.post("/software_project/questions",async(req,res)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({email:email})  //.populate('bookmarked_questions')
        const questions = await Question.find()

        // questions = await questions.json()
        // console.log(questions)
        // for(let question in questions){
        //   console.log(question)
        // }
        // let modified_questions = questions.map((question)=>{
        //   question.is_bookmarked = false
        //   question.is_upvoted = false
        //   question.is_downvoted = false
        //   user.bookmarked_questions.map((bookmarked_question)=>{
        //     if(bookmarked_question._id.toString() == question._id.toString()){
        //       console.log("hi")
        //       question.is_bookmarked = true
        //     }
        //   })
        //   return question
        // })
        // console.log(modified_questions,user.bookmarked_questions)

        res.json({questions:questions,bookmarked_questions:user.bookmarked_questions,upvoted_questions:user.upvoted_questions,downvoted_questions:user.downvoted_questions})
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

app.post("/software_project/add_bookmark",async(req,res)=>{
  try{
    const {questionId,email} = req.body
    const question = await Question.findById(questionId)
    const user = await User.findOne({email:email})
    if(!user.bookmarked_questions.includes(question._id)){
      user.bookmarked_questions.push(question)
    }
    await user.save()
    res.json(question)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/remove_bookmark",async(req,res)=>{
  try{
    const {questionId,email} = req.body
    const user = await User.findOne({email:email})
    if(user.bookmarked_questions.includes(questionId)){
      await User.findByIdAndUpdate({_id:user._id},{ $pull: { bookmarked_questions:questionId  } });
    }
    res.json(user)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/upvote",async(req,res)=>{
  try{
    const {questionId,email} = req.body
    const question = await Question.findById(questionId)
    const user = await User.findOne({email:email})
    if(!user.upvoted_questions.includes(question._id)){
      user.upvoted_questions.push(question)
      question.upvotes += 1
      if(user.downvoted_questions.includes(question._id)){
        // user.downvoted_questions.pop(question)
        await User.findByIdAndUpdate({_id:user._id},{ $pull: { downvoted_questions:questionId  } });
        question.downvotes -= 1
      }          
    }
    else{
      // user.upvoted_questions.pop(question)
      await User.findByIdAndUpdate({_id:user._id},{ $pull: { upvoted_questions:questionId  } });
      question.upvotes -=1
    }
    await user.save()
    await question.save()
    res.json(question)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
app.post("/software_project/downvote",async(req,res)=>{
  try{
    const {questionId,email} = req.body
    const question = await Question.findById(questionId)
    const user = await User.findOne({email:email})
    if(!user.downvoted_questions.includes(question._id)){
      user.downvoted_questions.push(question)
      question.downvotes +=1
      if(user.upvoted_questions.includes(question._id)){
        // user.upvoted_questions.pop(question)
        await User.findByIdAndUpdate({_id:user._id},{ $pull: { upvoted_questions:questionId  } });
        question.upvotes -=1
      }          
    }
    else{
      // user.downvoted_questions.pop(question)
      await User.findByIdAndUpdate({_id:user._id},{ $pull: { downvoted_questions:questionId  } });
      question.downvotes -=1
    }
    await user.save()
    await question.save()
    res.json(question)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})