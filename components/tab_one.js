import { View,Text, Pressable,StyleSheet} from "react-native"
import { useState,useEffect } from "react";
import Question from "./question";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

export default function Tab_one({navigation}){
    const isFocused = useIsFocused();
    const [questions,setQuestions] = useState([])

    const fetchQuestions=async()=>{
        const email = await SecureStore.getItemAsync("email")
        //Api call
        const response=await fetch(`http://172.31.33.189/software_project/questions`,{
            method:"post",
            body:JSON.stringify({email:email }),
            headers:{
                "Content-Type":'application/json'
            },
        })

        const json = await response.json();
        console.log(json)
        setQuestions(json.questions)
    }

    const addQuestion = async()=>{
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