import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { useIsFocused } from "@react-navigation/native";

export default function User({navigation}){
    const [email,setEmail] = useState("")
    const isFocused = useIsFocused();
    const [username,setUsername] = useState("")
    const [questions, setQuestions] = useState([])
    const [bookmarked_questions, setBookmarked_questions] = useState([])
    const [upvoted_questions, setUpvoted_questions] = useState([])
    const [downvoted_questions, setDownvoted_questions] = useState([])

    const showBookmarkedQuestions = ()=>{
        navigation.navigate("User_helper",{
            data:{
                questions:bookmarked_questions,
                bookmarked_questions:bookmarked_questions,
                upvoted_questions:upvoted_questions,
                downvoted_questions:downvoted_questions
            }
        })
    }
    const showUserQuestions = ()=>{
        navigation.navigate("User_helper",{
            data:{
                questions:questions,
                bookmarked_questions:bookmarked_questions,
                upvoted_questions:upvoted_questions,
                downvoted_questions:downvoted_questions
            }
        })
    }

    async function setUser(){
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
        setUpvoted_questions(json.upvoted_questions)
        setDownvoted_questions(json.downvoted_questions)
        setUsername(json.username)
    }

    useEffect(()=>{
        setUser()
    },[navigation,isFocused])

    return(
        <View style={styles.home}>
            <Text>username : {username}</Text>
            <Text>Email : {email}</Text>
            <View style={styles.submit}>
                <TouchableOpacity >
                    <Text style={styles.submitText} onPress={() => showBookmarkedQuestions()}>Bookmarked Questions</Text>
                </TouchableOpacity>
                {/* {temp?<Question questions={bookmarked_questions}
                bookmarked_questions={bookmarked_questions}
                upvoted_questions={upvoted_questions}
                downvoted_questions={downvoted_questions} />:<></>} */}
            </View>
            <View style={styles.submit}>
                <TouchableOpacity >
                    <Text style={styles.submitText} onPress={() => showUserQuestions()}>Your Questions</Text>
                </TouchableOpacity>
            </View>
            

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
    },
    submit: {
        marginTop: 16,
        backgroundColor: '#00BFFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
})