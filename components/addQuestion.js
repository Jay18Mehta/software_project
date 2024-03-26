import { View,TextInput ,StyleSheet, Pressable,Text} from "react-native"
import { useState } from "react"

export default function AddQuestion({navigation}){
    const  [question,setQuestion] = useState("")
    const  [option1,setOption1] = useState("")
    const  [option2,setOption2] = useState("")
    const  [option3,setOption3] = useState("")
    const  [option4,setOption4] = useState("")
    const  [correctOption,setCorrectOption] = useState("")

    const addQuestion = async(e)=>{
        // console.log(question)
        e.preventDefault()
        // Api Call
        const response=await fetch(`http://172.31.33.189/software_project/addQuestions`,{   //Ansh =>172.31.52.60, Jay => 172.31.33.189
            method:"post",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({question:question,options:[option1,option2,option3,option4],correct:correctOption})
        })
        const json=await response.json()
        console.log(json)
        navigation.navigate('Home')
    }
    return (
        <View>
            <TextInput onChangeText={setQuestion} value={question} style={styles.input} placeholder="Question"/>
            <TextInput onChangeText={setOption1} value={option1} style={styles.input} placeholder="Option1"/>
            <TextInput onChangeText={setOption2} value={option2} style={styles.input} placeholder="Option2"/>
            <TextInput onChangeText={setOption3} value={option3} style={styles.input} placeholder="Option3"/>
            <TextInput onChangeText={setOption4} value={option4} style={styles.input} placeholder="Option4"/>
            <TextInput onChangeText={setCorrectOption} value={correctOption} style={styles.input} placeholder="Correct Option"/>
            <Pressable onPress={addQuestion}><Text>Save</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });