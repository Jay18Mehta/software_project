import { View, TextInput, StyleSheet, Pressable, Text } from "react-native"
import { useState } from "react"
import * as SecureStore from 'expo-secure-store';

export default function AddQuestion({ navigation }) {
    const [question, setQuestion] = useState("")
    const [option1, setOption1] = useState("")
    const [option2, setOption2] = useState("")
    const [option3, setOption3] = useState("")
    const [option4, setOption4] = useState("")
    const [correctOption, setCorrectOption] = useState("")

    const addQuestion = async (e) => {
        // console.log(question)
        e.preventDefault()
        const user_email = await SecureStore.getItemAsync("email")
        // Api Call
        const response = await fetch(`http://172.31.52.60/software_project/addQuestions`, {   //Ansh =>172.31.52.60, Jay => 172.31.33.189
            method: "post",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ question: question, options: [option1, option2, option3, option4], correct: correctOption,email:user_email })
        })
        const json = await response.json()
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <TextInput onChangeText={setQuestion} value={question} style={styles.question} placeholder="Question" />
                <TextInput onChangeText={setOption1} value={option1} style={styles.input} placeholder="Option 1" />
                <TextInput onChangeText={setOption2} value={option2} style={styles.input} placeholder="Option 2" />
                <TextInput onChangeText={setOption3} value={option3} style={styles.input} placeholder="Option 3" />
                <TextInput onChangeText={setOption4} value={option4} style={styles.input} placeholder="Option 4" />
                <TextInput onChangeText={setCorrectOption} value={correctOption} style={styles.correct} placeholder="Correct Option" />
                <Pressable onPress={addQuestion} style={styles.save}><Text style={styles.saveText}>Save</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },
    question: {
        height: 40,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8
    },
    input: {
        height: 40,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 8
    },
    correct: {
        height: 40,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#d0f0c0',
        borderRadius: 8
    },
    save: {
        height: 40,
        marginTop: 8,
        backgroundColor: '#00BFFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
