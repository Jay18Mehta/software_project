const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const port = 80

const Question = require("./models/question")
const User = require("./models/user")
const Api_Question = require("./models/api_question")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/software_project');
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!")
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/software_project/questions",async(req,res)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({email:email})
        const questions = await Question.find()
        res.json({questions:questions,bookmarked_questions:user.bookmarked_questions,upvoted_questions:user.upvoted_questions,downvoted_questions:user.downvoted_questions})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }  
})

app.post("/software_project/addQuestions",async(req,res)=>{
  try{
      const  {question,options,correct,email,category} = req.body
      console.log(req.body)
      const user = await User.findOne({email:email})
      const question_object = new Question({question:question,options:options,correct:correct,user:user,category:category})
      await question_object.save()
      user.questions.push(question_object)
      await user.save()
      // console.log(question_object)
      res.json(user)
  }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/login",async(req,res)=>{
  try{
    const {username , email} = req.body
    console.log(req.body)
    const user = await User.findOne({ username: username, email: email })
    console.log(user)
    if (!user) {
      const new_user = new User({ username: username, email: email })
      await new_user.save()
      console.log(new_user)
      res.json(new_user)
    }
    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/add_bookmark", async (req, res) => {
  try {
    const { questionId, email } = req.body
    const question = await Question.findById(questionId)
    const user = await User.findOne({email:email})
    if(question &&!user.bookmarked_questions.includes(question._id)){
      user.bookmarked_questions.push(question)
    }
    await user.save()
    res.json(question)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/remove_bookmark", async (req, res) => {
  try {
    const { questionId, email } = req.body
    const user = await User.findOne({ email: email })
    if (user.bookmarked_questions.includes(questionId)) {
      
      await User.findByIdAndUpdate({ _id: user._id }, { $pull: { bookmarked_questions: questionId } });
    }
    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/upvote", async (req, res) => {
  try {
    const { questionId, email } = req.body
    const question = await Question.findById(questionId)
    const user = await User.findOne({email:email})
    if(question){
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
    }
    res.json(question)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
app.post("/software_project/downvote", async (req, res) => {
  try {
    const { questionId, email } = req.body
    const question = await Question.findById(questionId)
    const user = await User.findOne({email:email})
    if(question){
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
    }
    res.json(question)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/get_user", async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email }).populate('questions').populate('bookmarked_questions').populate('api_bookmarks')
    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/get_user_ids", async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/api_bookmark", async (req, res) => {
  try {
    const { email, id, question, options, correct } = req.body
    const user = await User.findOne({ email: email })
    const api_question = await Api_Question.findOne({ id: id })
    if (!api_question) {
      const new_api_question = new Api_Question({ question: question, id: id, options: options, correct: correct })
      await new_api_question.save()
      user.api_bookmarks.push(new_api_question)
    }
    else if (user.api_bookmarks.includes(api_question._id)) {
      await User.findByIdAndUpdate({ _id: user._id }, { $pull: { api_bookmarks: api_question._id } });
    }
    else {
      user.api_bookmarks.push(api_question)
    }
    await user.save()
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/software_project/current_api_bookmarks", async (req, res) => {
  try {
    const {email} = req.body
    const user = await User.findOne({email:email}).populate('api_bookmarks')
    console.log(user.api_bookmarks)
    const ids = user.api_bookmarks.map(user=>user.id)
    console.log(ids)
    res.json(ids)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})