import { View,Text, Pressable,StyleSheet} from "react-native"
import { useState,useEffect } from "react";
import Question from "./question";
import { useIsFocused } from "@react-navigation/native";

export default function Home({navigation}){
    const isFocused = useIsFocused();
    const [questions,setQuestions] = useState([])

    const fetchQuestions= async() => {
        //Api call
        const response=await fetch(`http://172.31.52.60/software_project/questions`,{
            method:"get",
            headers:{
                "Content-Type":'application/json'
            },
        })

        const json = await response.json();
        console.log(json)
        setQuestions(json)
    }

    const addQuestion = async() => {
        navigation.navigate('AddQuestion')
    }

    useEffect(()=>{
        if(isFocused){
            fetchQuestions()
        }
    },[isFocused])

    return (
        <View style = {styles.home}>
            {/* {questions.map((question)=>{
                return <Question question={question}/>
            })} */}
            <Question questions={questions} />

            <Pressable style={styles.addButton} onPress={addQuestion}><Text>+</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    home :{
        flex:1
    },
    addButton : {
        position: 'absolute',
        bottom:40,
        right: 40,
        backgroundColor:"#fca103",
        width: 44,
        height: 44,
        borderRadius: 44/2,
        alignItems:"center",
        justifyContent:"center"
    }
})