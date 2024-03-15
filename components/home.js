import { View,Text, Pressable } from "react-native"
import { useState,useEffect } from "react";
import Question from "./question";

export default function Home(){
    const [questions,setQuestions] = useState([])

    const fetchQuestions=async()=>{
        //Api call
        const response=await fetch(`http://172.31.33.189/software_project/questions`,{
            method:"get",
            headers:{
                "Content-Type":'application/json'
            },
        })
        const json = await response.json();
        console.log(json)
        setQuestions(json)
    }

    const addQuestion = async()=>{
        
    }

    useEffect(()=>{
        fetchQuestions()
    },[])

    return (
        <View>
            {questions.map((question)=>{
                return <Question question={question}/>
            })}
            <Pressable onPress={addQuestion}><Text>+</Text></Pressable>
        </View>
    )
}