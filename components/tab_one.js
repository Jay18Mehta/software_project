import { View, Text, Pressable, StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import Question from "./question"
import { useIsFocused } from "@react-navigation/native"
import * as SecureStore from 'expo-secure-store'

export default function Tab_one({ navigation }) {
    const isFocused = useIsFocused()
    const [questions, setQuestions] = useState([])
    const [bookmarked_questions, setBookmarked_questions] = useState([])
    const [upvoted_questions, setUpvoted_questions] = useState([])
    const [downvoted_questions, setDownvoted_questions] = useState([])

    const fetchQuestions = async () => {
        const email = await SecureStore.getItemAsync("email")
        //Api call
        const response = await fetch(`http://172.31.52.60/software_project/questions`, {
            method: "post",
            body: JSON.stringify({ email: email }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const json = await response.json()
        setQuestions(json.questions)
        setBookmarked_questions(json.bookmarked_questions)
        setUpvoted_questions(json.upvoted_questions)
        setDownvoted_questions(json.downvoted_questions)
    }

    const addQuestion = async () => {
        navigation.navigate('Add Question')
    }

    useEffect(() => {
        fetchQuestions()
    }, [isFocused,navigation,bookmarked_questions])

    return (
        <View style={styles.home}>
            <Question
                questions={questions}
                bookmarked_questions={bookmarked_questions}
                upvoted_questions={upvoted_questions}
                downvoted_questions={downvoted_questions} 
            />
            <Pressable style={styles.addButton} onPress={addQuestion}><Text>+</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        flex: 1
    },
    addButton: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: "#fca103",
        width: 50, 
        height: 50,
        borderRadius: 30, 
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000000", // Added shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
    
})