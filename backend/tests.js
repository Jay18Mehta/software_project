const assert = require("assert")
const chalk = require('chalk')


async function loginUser(email="b22cs034@iitj.ac.in",name = "Mehta Jay Kamalkumar (B22CS034)"){
    const response = await fetch(`http://172.31.33.189/software_project/login`, { 
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ username: name, email: email })
    })
    const json = await response.json()
    // console.log(json)
    return json
}

async function getQuestions(email="b22cs034@iitj.ac.in"){
    //Api call
    const response = await fetch(`http://172.31.33.189/software_project/questions`, {
        method: "post",
        body: JSON.stringify({ email: email }),
        headers: {
            "Content-Type": 'application/json'
        },
    })

    const json = await response.json()
    // console.log(json)
    return json
}

async function addQuestion(question,options,correctOption,email="b22cs034@iitj.ac.in",category){
    const response = await fetch(`http://172.31.33.189/software_project/addQuestions`, { 
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ question: question, options: options, correct: correctOption, email: email, category: category })
    })
    const json = await response.json()
    // console.log(json)
    return json
}

async function getUser(email="b22cs034@iitj.ac.in"){
    const response = await fetch(`http://172.31.33.189/software_project/get_user`, {
        method: "post",
        body: JSON.stringify({ email: email }),
        headers: {
            "Content-Type": 'application/json'
        },
    })

    const json = await response.json()
    // console.log(json)
    return json
}

async function removeBookmark(questionId,email="b22cs034@iitj.ac.in"){
    const response = await fetch(`http://172.31.33.189/software_project/remove_bookmark`, {   
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ questionId: questionId, email: email })
    })
    const json = await response.json()
    // console.log(json)
    return json
}

async function addBookmark(questionId,email="b22cs034@iitj.ac.in"){
    const response = await fetch(`http://172.31.33.189/software_project/add_bookmark`, {   
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ questionId: questionId, email: email })
    })
    const json = await response.json()
    // console.log(json)
    return json
}

async function upvoteQuestion(questionId,email="b22cs034@iitj.ac.in"){
    const response = await fetch(`http://172.31.33.189/software_project/upvote`, { 
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ questionId: questionId, email: email })
    })
    const json = await response.json()
    // console.log(json)
    return json
}

async function downvoteQuestion(questionId,email="b22cs034@iitj.ac.in"){
    const response = await fetch(`http://172.31.33.189/software_project/downvote`, {  
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ questionId: questionId, email: email })
    })
    const json = await response.json()
    // console.log(json)
    return json
}

const user_email = "b22cs034@iitj.ac.in"
const user_name = "Mehta Jay Kamalkumar (B22CS034)"

async function test1_fetchingQuestionsCorrectly(){
    console.log(chalk.blue("Starting test1:fetch questions working correctly"))
    const d = new Date();
    let time = d.getTime();
    const {questions,bookmarked_questions,upvoted_questions,downvoted_questions}=await getQuestions(user_email)
    assert(questions.length>=0, chalk.red("test1_fetchingQuestionsCorrectly failed,len of questions is None or less than 0"))
    assert(bookmarked_questions.length>=0, chalk.red("test1_fetchingQuestionsCorrectly failed,len of bookmarked_questions is None or less than 0"))
    assert(upvoted_questions.length>=0, chalk.red("test1_fetchingQuestionsCorrectly failed,len of upvoted_questions is None or less than 0"))
    assert(downvoted_questions.length>=0, chalk.red("test1_fetchingQuestionsCorrectly failed,len of downvoted_questions is None or less than 0"))
    const d2 = new Date();
    let time2 = d2.getTime();
    console.log(chalk.green("test1"))  
    console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
}

async function test2_loginUser(){
    console.log(chalk.blue("Starting test2:User should be able to login"))
    const d = new Date();
    let time = d.getTime();
    const {username,email,questions,bookmarked_questions,upvoted_questions,downvoted_questions} = await loginUser(user_email,user_name)
    assert(username==user_name,chalk.red("test2_loginUser failed,fetched user_name is not equal to input username"))
    assert(email==user_email,chalk.red("test2_loginUser failed,fetched user_email is not equal to input email"))
    assert(downvoted_questions.length>=0, chalk.red("test2_loginUser failed,len of downvoted_questions is None or less than 0"))
    assert(upvoted_questions.length>=0, chalk.red("test2_loginUser failed,len of upvoted_questions is None or less than 0"))
    assert(bookmarked_questions.length>=0, chalk.red("test2_loginUser failed,len of bookmarked_questions is None or less than 0"))
    assert(questions.length>=0, chalk.red("test2_loginUser failed,len of questions is None or less than 0"))
    const d2 = new Date();
    let time2 = d2.getTime();
    console.log(chalk.green("test2"))  
    console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
}

async function test3_getUser(){
    console.log(chalk.blue("Starting test3:User data should be retrieved correctly"))
    const d = new Date();
    let time = d.getTime();
    const {username,email,questions,bookmarked_questions,upvoted_questions,downvoted_questions} = await getUser(user_email)
    assert(email==user_email,chalk.red("test3_getUser failed,fetched user_email is not equal to input email"))
    assert(downvoted_questions.length>=0, chalk.red("test3_getUser failed,len of downvoted_questions is None or less than 0"))
    assert(upvoted_questions.length>=0, chalk.red("test3_getUser failed,len of upvoted_questions is None or less than 0"))
    assert(bookmarked_questions.length>=0, chalk.red("test3_getUser failed,len of bookmarked_questions is None or less than 0"))
    assert(questions.length>=0, chalk.red("test3_getUser failed,len of questions is None or less than 0"))
    const d2 = new Date();
    let time2 = d2.getTime();
    console.log(chalk.green("test3"))  
    console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
}

async function test4_upvote_count(){
    console.log(chalk.blue("Starting test4:User should be able to upvote question and remove upvote"))
    const d = new Date();
    let time = d.getTime();
    const {questions,bookmarked_questions,upvoted_questions,downvoted_questions}=await getQuestions(user_email)
    if(questions.length>0){
        const question = questions[0]
        const present_upvotes = question.upvotes
        let isUpvoted = upvoted_questions.includes(question._id)
        const question1 = await upvoteQuestion(question._id,user_email)
        if(isUpvoted){
            assert(present_upvotes==question1.upvotes+1,chalk.red("test4_upvote failed: questions upvote did not get removed"))
        }
        else{
            assert(present_upvotes+1==question1.upvotes,chalk.red("test4_upvote failed: questions upvote did not get added"))
        }

        const question2 = await upvoteQuestion(question._id,user_email)
        if(isUpvoted){
            assert(present_upvotes==question2.upvotes,chalk.red("test4_upvote failed: questions upvote did not get added"))
        }
        else{
            assert(present_upvotes==question2.upvotes,chalk.red("test4_upvote failed: questions upvote did not get removed"))
        }
        const d2 = new Date();
        let time2 = d2.getTime();
        console.log(chalk.green("test4"))  
        console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
    }
    else{
        console.log("length of questions is 0")
    }
}

async function test5_downvote_count(){
    console.log(chalk.blue("Starting test5:User should be able to downvote question and remove downvote"))
    const d = new Date();
    let time = d.getTime();
    const {questions,bookmarked_questions,upvoted_questions,downvoted_questions}=await getQuestions(user_email)
    if(questions.length>0){
        const question = questions[0]
        const present_downvotes = question.downvotes
        let isDownvoted = downvoted_questions.includes(question._id)
        const question1 = await downvoteQuestion(question._id,user_email)
        if(isDownvoted){
            assert(present_downvotes==question1.downvotes+1,chalk.red("test5_downvote_count failed: questions downvote did not get removed"))
        }
        else{
            assert(present_downvotes+1==question1.downvotes,chalk.red("test5_downvote_count failed: questions downvote did not get added"))
        }

        const question2 = await downvoteQuestion(question._id,user_email)
        if(isDownvoted){
            assert(present_downvotes==question2.downvotes,chalk.red("test5_downvote_count failed: questions downvote did not get added"))
        }
        else{
            assert(present_downvotes==question2.downvotes,chalk.red("test5_downvote_count failed: questions downvote did not get removed"))
        }
        const d2 = new Date();
        let time2 = d2.getTime();
        console.log(chalk.green("test5"))  
        console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
    }
    else{
        console.log("length of questions is 0")
    }
}

async function test6_Bookmark(){
    console.log(chalk.blue("Starting test6:User should be able to add and remove bookmark"))
    const d = new Date();
    let time = d.getTime();
    let {questions,bookmarked_questions,upvoted_questions,downvoted_questions}=await getQuestions(user_email)
    if(questions.length>0){
        const question = questions[0]
        let isBookmarked = bookmarked_questions.includes(question._id)
        if(isBookmarked){
            await removeBookmark(question._id,user_email)
            let {bookmarked_questions}= await getQuestions(user_email)
            assert(!bookmarked_questions.includes(question._id),chalk.red("test6_Bookmark failed: bookmarks did not get removed"))
        }
        else{
            await addBookmark(question._id,user_email)
            let {bookmarked_questions}= await getQuestions(user_email)
            assert(bookmarked_questions.includes(question._id),chalk.red("test6_Bookmark failed: bookmarks did not get added"))
        }

        if(isBookmarked){
            await addBookmark(question._id,user_email)
            let {bookmarked_questions}= await getQuestions(user_email)
            assert(bookmarked_questions.includes(question._id),chalk.red("test6_Bookmark failed: bookmarks did not get added"))
        }
        else{
            await removeBookmark(question._id,user_email)
            let {bookmarked_questions}= await getQuestions(user_email)
            assert(!bookmarked_questions.includes(question._id),chalk.red("test6_Bookmark failed: bookmarks did not get removed"))
        }
        const d2 = new Date();
        let time2 = d2.getTime();
        console.log(chalk.green("test6"))  
        console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
    }
    else{
        console.log("length of questions is 0")
    }
}

async function test7_noDuplicateQuestion(){
    console.log(chalk.blue("Starting test6:User should be able to add and remove bookmark"))
    const d = new Date();
    let time = d.getTime();
    let {questions,bookmarked_questions,upvoted_questions,downvoted_questions}=await getQuestions(user_email)
    if(questions.length>0){
        const length = questions.length
        const question = questions[0]
        try{
            await addQuestion(question.question,question.options,question.correct,user_email,question.category)
        }
        catch{

        }
        let response=await getQuestions(user_email)
        assert(response.questions.length == length,"test7_noDuplicateQuestion failed: duplicate question gets added")
        const d2 = new Date();
        let time2 = d2.getTime();
        console.log(chalk.green("test7"))  
        console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
    }
    else{
        console.log("length of questions is 0")
    }
}

async function test8_upvoteRemovesDownvote(){
    console.log(chalk.blue("Starting test8:Upvote and downvote cant exists simultaneously"))
    const d = new Date();
    let time = d.getTime();
    let response=await getQuestions(user_email)
    if(response.questions.length>0){
        const question =response.questions[0]
        let isDownvoted = response.downvoted_questions.includes(question._id)
        if(!isDownvoted){
            await downvoteQuestion(question._id,user_email)
        }
        await upvoteQuestion(question._id,user_email)
        let {questions,bookmarked_questions,upvoted_questions,downvoted_questions}=await getQuestions(user_email)
        assert(upvoted_questions.includes(question._id),chalk.red("test8_upvoteRemovesDownvote failed: question did not get added in upvoted question"))
        assert(!downvoted_questions.includes(question._id),chalk.red("test8_upvoteRemovesDownvote failed: question did not get removed from downvote questions"))
        const d2 = new Date();
        let time2 = d2.getTime();
        console.log(chalk.green("test8"))  
        console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
    }
    else{
        console.log("length of questions is 0")
    }
}

async function test9_downvoteRemovesUpvote(){
    console.log(chalk.blue("Starting test9:Upvote and downvote cant exists simultaneously"))
    const d = new Date();
    let time = d.getTime();
    let response=await getQuestions(user_email)
    if(response.questions.length>0){
        const question =response.questions[0]
        let isUpvoted = response.upvoted_questions.includes(question._id)
        if(!isUpvoted){
            await upvoteQuestion(question._id,user_email)
        }
        await downvoteQuestion(question._id,user_email)
        let {questions,bookmarked_questions,upvoted_questions,downvoted_questions}=await getQuestions(user_email)
        assert(downvoted_questions.includes(question._id),chalk.red("test9_downvoteRemovesUpvote failed: question did not get added in downvoted question"))
        assert(!upvoted_questions.includes(question._id),chalk.red("test9_downvoteRemovesUpvote failed: question did not get removed from upvoted questions"))
        const d2 = new Date();
        let time2 = d2.getTime();
        console.log(chalk.green("test9"))  
        console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
    }
    else{
        console.log("length of questions is 0")
    }
}

async function test10_getQuestionsFetchesUserCorrectly(){
    console.log(chalk.blue("Starting test10:user data and data from fetched questions should be same"))
    const d = new Date();
    let time = d.getTime();
    const response = await getQuestions(user_email)
    const user_data = await getUser(user_email)
    assert(JSON.stringify(response.upvoted_questions)==JSON.stringify(user_data.upvoted_questions),chalk.red("test10_getQuestionsFetchesUserCorrectly failed: user_data and fetched questions are not same does not have upvoted questions"))
    assert(JSON.stringify(response.downvoted_questions)==JSON.stringify(user_data.downvoted_questions),chalk.red("test10_getQuestionsFetchesUserCorrectly failed: user_data and fetched questions are not same does not have downvoted questions"))
    assert(JSON.stringify(response.bookmarked_questions)==JSON.stringify(user_data.bookmarked_questions.map(question=>question._id)),chalk.red("test10_getQuestionsFetchesUserCorrectly failed: user_data and fetched questions are not same does not have bookmarked questions"))
    const d2 = new Date();
    let time2 = d2.getTime();
    console.log(chalk.green("test10"))  
    console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
}

async function test11_upvoteQuestion_and_Userdata(){
    console.log(chalk.blue("Starting test11:User's upvoted questions should update on upvoting a question"))
    const d = new Date();
    let time = d.getTime();
    let response=await getQuestions(user_email)
    if(response.questions.length>0){
        const question =response.questions[0]
        let isUpvoted = response.upvoted_questions.includes(question._id)
        if(isUpvoted){
            await upvoteQuestion(question._id,user_email)
        }
        let user = await getUser(user_email)
        assert(!user.upvoted_questions.includes(question._id),chalk.red("test11_upvoteQuestion_and_Userdata failed: not upvoted question is present is user's upvoted questions"))
        await upvoteQuestion(question._id,user_email)
        user = await getUser(user_email)
        assert(user.upvoted_questions.includes(question._id),chalk.red("test11_upvoteQuestion_and_Userdata failed: upvoted question is not present is user's upvoted questions"))
        const d2 = new Date();
        let time2 = d2.getTime();
        console.log(chalk.green("test11"))  
        console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
    }
    else{
        console.log("length of questions is 0")
    }
}

async function test12_downvoteQuestion_and_Userdata(){
    console.log(chalk.blue("Starting test12:User's downvoted questions should update on downvoting a question"))
    const d = new Date();
    let time = d.getTime();
    let response=await getQuestions(user_email)
    if(response.questions.length>0){
        const question =response.questions[0]
        let isDownvoted = response.downvoted_questions.includes(question._id)
        if(isDownvoted){
            await downvoteQuestion(question._id,user_email)
        }
        let user = await getUser(user_email)
        assert(!user.downvoted_questions.includes(question._id),chalk.red("test12_downvoteQuestion_and_Userdata failed: not downvoted question is present is user's downvoted questions"))
        await downvoteQuestion(question._id,user_email)
        user = await getUser(user_email)
        assert(user.downvoted_questions.includes(question._id),chalk.red("test12_downvoteQuestion_and_Userdata failed: downvoted question is not present is user's downvoted questions"))
        const d2 = new Date();
        let time2 = d2.getTime();
        console.log(chalk.green("test12"))  
        console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
    }
    else{
        console.log("length of questions is 0")
    }
}

async function test13_bookmarkQuestion_and_Userdata(){
    console.log(chalk.blue("Starting test13:User's bookmarked questions should update on bookmarking a question"))
    const d = new Date();
    let time = d.getTime();
    let response=await getQuestions(user_email)
    if(response.questions.length>0){
        const question =response.questions[0]
        let isBookmarked = response.bookmarked_questions.includes(question._id)
        if(isBookmarked){
            await removeBookmark(question._id,user_email)
        }
        let user = await getUser(user_email)
        assert(!user.bookmarked_questions.map(question=>question._id).includes(question._id),chalk.red("not bookmarked question is present is user's bookmarked questions"))
        await addBookmark(question._id,user_email)
        user = await getUser(user_email)
        assert(user.bookmarked_questions.map(question=>question._id).includes(question._id),chalk.red("bookmarked question is not present is user's bookmarked questions"))
        const d2 = new Date();
        let time2 = d2.getTime();
        console.log(chalk.green("test13"))  
        console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))  
    }
    else{
        console.log("length of questions is 0")
    }
}

async function test14_invalidEmail(){
    console.log(chalk.blue("Starting test14: get user should only work with valid email ID"))
    const d = new Date();
    let time = d.getTime();
    const user = await getUser("123@iitj.ac.in")
    assert(!user,chalk.red("test14_invalidEmail failed"))
    const d2 = new Date();
    let time2 = d2.getTime();
    console.log(chalk.green("test14"))  
    console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`)) 
}

async function test15_invalidQuestion(){
    console.log(chalk.blue("Starting test15:Invalid question should not be added in database"))
    const d = new Date();
    let time = d.getTime();
    let {questions,bookmarked_questions,upvoted_questions,downvoted_questions}=await getQuestions(user_email)
    const initial_length = questions.length
    try{
        await addQuestion("Invalid question?",["a","b","c","d"],"a",user_email)
    }
    catch{

    }
    let response=await getQuestions(user_email)
    assert(response.questions.length == initial_length,"test15_invalidQuestion failed: invalid question gets added")
    const d2 = new Date();
    let time2 = d2.getTime();
    console.log(chalk.green("test15"))  
    console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))     
}

async function test16_invalidBookmark(){
    console.log(chalk.blue("Starting test16:Invalid question should not be bookmarked in database"))
    const d = new Date();
    let time = d.getTime();
    let user = await getUser(user_email)
    const initial_length = user.bookmarked_questions.length
    try{
        await addBookmark("InvalidId",user_email)
    }
    catch{

    }
    user = await getUser(user_email)
    assert(user.bookmarked_questions.length == initial_length,"test16_invalidBookmark failed: invalid question gets bookmmarked")
    
    try{
        await removeBookmark("InvalidId",user_email)
    }
    catch{

    }
    user = await getUser(user_email)
    assert(user.bookmarked_questions.length == initial_length,"test16_invalidBookmark failed: invalid question gets unbookmmarked")
    const d2 = new Date();
    let time2 = d2.getTime();
    console.log(chalk.green("test16"))  
    console.log(chalk.green(`Status:Passed , Time:${time2-time} milliseconds`))
}

async function unitTesting(){
    await test1_fetchingQuestionsCorrectly()
    await test2_loginUser()
    await test3_getUser()
    await test4_upvote_count()
    await test5_downvote_count()
    await test6_Bookmark()
    await test7_noDuplicateQuestion()
    await test14_invalidEmail()
    await test15_invalidQuestion()
    await test16_invalidBookmark()
}   


async function componentTesting(){
    await test8_upvoteRemovesDownvote()
    await test9_downvoteRemovesUpvote()
    await test10_getQuestionsFetchesUserCorrectly()
    await test11_upvoteQuestion_and_Userdata()
    await test12_downvoteQuestion_and_Userdata()
    await test13_bookmarkQuestion_and_Userdata()
}

async function main(){
    console.log("Starting Unit testing")
    await unitTesting()
    console.log("Starting Component testing")
    await componentTesting()
}

main()

