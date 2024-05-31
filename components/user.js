import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from "@expo/vector-icons"

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
        navigation.navigate("Bookmarked : Asked", {
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
        navigation.navigate("Your Asked Questions", {
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
        const response = await fetch(`http://192.168.29.84/software_project/get_user`, {
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
        const response = await fetch(`http://192.168.29.84/software_project/get_user_ids`, {
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

    const imagesDataURL = require('../assets/AppDisplayPhoto.jpeg')
    const [selectedImage, setSelectedImage] = useState(imagesDataURL)

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        })

        console.log(result)

        if (!result.canceled) {
            setSelectedImage({ uri: result.assets[0].uri });
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>

            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.imageIcon} source={selectedImage} />
                    <TouchableOpacity onPress={handleImageSelection}>
                        <View style={styles.container2}>
                            <MaterialIcons name="photo-camera" size={32} color={'#242760'} />
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView>

        // <View style={styles.home}>
        //     <Text>username : {username}</Text>
        //     <Text>Email : {email}</Text>
        //     <View style={styles.container}>
        //         <View style={styles.button}>
        //             <TouchableOpacity >
        //                 <Text style={styles.buttonText} onPress={() => showBookmarkedDoubtQuestions()}>Bookmarked Asked Questions</Text>
        //             </TouchableOpacity>
        //         </View>
        //         <View style={styles.button}>
        //             <TouchableOpacity >
        //                 <Text style={styles.buttonText} onPress={() => showBookmarkedPractiseQuestions()}>Bookmarked Practice Questions</Text>
        //             </TouchableOpacity>
        //         </View>
        //         <View style={styles.button}>
        //             <TouchableOpacity >
        //                 <Text style={styles.buttonText} onPress={() => showUserQuestions()}>Your Asked Questions</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 22 // 30
    },
    container: {
        alignItems: "center",
        marginVertical: 22,
    },
    imageIcon: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#242760'
    },
    container2: {
        position: "absolute",
        bottom: 5,
        right: -90,
        zIndex: 9999,
    }

})