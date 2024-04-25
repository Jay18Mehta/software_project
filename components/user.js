import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from "@react-navigation/native";

export default function User({ navigation }) {
    const [email, setEmail] = useState("")
    const isFocused = useIsFocused()
    const [username, setUsername] = useState("")
    const [questions, setQuestions] = useState([])
    const [bookmarked_questions, setBookmarked_questions] = useState([])
    const [bookmarked_questions_ids, setBookmarked_questions_Ids] = useState([])
    const [api_bookmarks, setApi_Bookmarks] = useState([])
    const [api_bookmarks_ids, setApi_Bookmarks_Ids] = useState([])
    const [upvoted_questions_ids, setUpvoted_questions_Ids] = useState([])
    const [downvoted_questions_ids, setDownvoted_questions_Ids] = useState([])

    const showBookmarkedDoubtQuestions = () => {
        navigation.navigate("Bookmarked : Doubt", {
            data: {
                questions: bookmarked_questions,
                upvoted_questions: upvoted_questions_ids,
                downvoted_questions: downvoted_questions_ids
            }
        })
    }

    const showBookmarkedPractiseQuestions = () => {
        navigation.navigate("Bookmarked : Practice", {
            data: {
                questions: api_bookmarks,
                bookmarked_questions: api_bookmarks_ids
            }
        })
    }

    const showUserQuestions = () => {
        navigation.navigate("Your Doubt Questions", {
            data: {
                questions: questions,
                bookmarked_questions: bookmarked_questions_ids,
                upvoted_questions: upvoted_questions_ids,
                downvoted_questions: downvoted_questions_ids
            }
        })
    }

    async function setUser() {
        const emailID = await SecureStore.getItemAsync("email")
        setEmail(emailID)
        const response = await fetch(`http://172.31.33.189/software_project/get_user`, {
            method: "post",
            body: JSON.stringify({ email: emailID }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const json = await response.json()
        setQuestions(json.questions)
        setBookmarked_questions(json.bookmarked_questions)
        setApi_Bookmarks(json.api_bookmarks)
        setUsername(json.username)
    }

    async function setUser_Ids() {
        const emailID = await SecureStore.getItemAsync("email")
        const response = await fetch(`http://172.31.33.189/software_project/get_user_ids`, {
            method: "post",
            body: JSON.stringify({ email: emailID }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const json = await response.json()
        setBookmarked_questions_Ids(json.bookmarked_questions)
        setApi_Bookmarks_Ids(json.api_bookmarks)
        setUpvoted_questions_Ids(json.upvoted_questions)
        setDownvoted_questions_Ids(json.downvoted_questions)
    }

    useEffect(() => {
        setUser()
        setUser_Ids()
    }, [navigation, isFocused])

    return (
        <View style={styles.home}>
            <Text>username : {username}</Text>
            <Text>Email : {email}</Text>
            <View style={styles.container}>
                <View style={styles.button}>
                    <TouchableOpacity >
                        <Text style={styles.buttonText} onPress={() => showBookmarkedDoubtQuestions()}>Bookmarked Doubt Questions</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity >
                        <Text style={styles.buttonText} onPress={() => showBookmarkedPractiseQuestions()}>Bookmarked Practice Questions</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity >
                        <Text style={styles.buttonText} onPress={() => showUserQuestions()}>Your Doubt Questions</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,  // Add some padding to the container
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        marginVertical: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
})