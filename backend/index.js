const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const port = 80

const Question =  require("./models/question") 

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})