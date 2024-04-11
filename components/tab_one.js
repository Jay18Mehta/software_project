import { View, Text, Pressable, StyleSheet } from "react-native"
import { useState, useEffect } from "react";
import Question from "./question";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

export default function Tab_one({ navigation }) {
    const isFocused = useIsFocused();
    const [questions, setQuestions] = useState([])
    const [bookmarked_questions, setBookmarked_questions] = useState([])
    const [upvoted_questions, setUpvoted_questions] = useState([])
    const [downvoted_questions, setDownvoted_questions] = useState([])

    const fetchQuestions = async () => {
        const email = await SecureStore.getItemAsync("email")
        //Api call
        const response = await fetch(`http://172.31.33.189/software_project/questions`, {
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
        navigation.navigate('AddQuestion')
    }

    useEffect(() => {
        fetchQuestions()
    }, [isFocused,navigation])


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
        width: 44,
        height: 44,
        borderRadius: 44 / 2,
        alignItems: "center",
        justifyContent: "center"
    }
})