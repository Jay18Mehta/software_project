import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useState } from "react"
import * as SecureStore from 'expo-secure-store'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

export default function TabTwo({ navigation }) {
    const [questions, setQuestions] = useState([])
    const [api_bookmarks_ids, setApi_Bookmarks_Ids] = useState([])

    const fetchQuestions_General_Knowledge = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=9&type=multiple');
        const json = await response.json()

        const emailID = await SecureStore.getItemAsync("email")

        const ids_response = await fetch(`http://192.168.29.84/software_project/current_api_bookmarks`, {
            method: "post",
            body: JSON.stringify({ email: emailID }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const ids_json = await ids_response.json()

        // Fixing Typo
        const questions = json.results.map(question => ({
            ...question,
            question: question.question
                .replace(/&quot;/g, "'")
                .replace(/&Eacute;/g, "É")
                .replace(/&oacute;/g, "ó")
                .replace(/&#039;/g, "'")
        }))

        setQuestions(questions)
        setApi_Bookmarks_Ids(ids_json)

        navigation.navigate("General Knowledge", {
            data: {
                questions: questions,
                bookmarked_questions: api_bookmarks_ids
            }
        })
    }

    const fetchQuestions_Entertainment = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=11&type=multiple');
        const json = await response.json()

        const emailID = await SecureStore.getItemAsync("email")

        const ids_response = await fetch(`http://192.168.29.84/software_project/current_api_bookmarks`, {
            method: "post",
            body: JSON.stringify({ email: emailID }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const ids_json = await ids_response.json()

        // Fixing Typo
        const questions = json.results.map(question => ({
            ...question,
            question: question.question
                .replace(/&quot;/g, "'")
                .replace(/&Eacute;/g, "É")
                .replace(/&oacute;/g, "ó")
                .replace(/&#039;/g, "'")
        }))

        setQuestions(questions)
        setApi_Bookmarks_Ids(ids_json)

        navigation.navigate("Entertainment", {
            data: {
                questions: questions,
                bookmarked_questions: api_bookmarks_ids
            }
        })
    }

    const fetchQuestions_Science = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=17&type=multiple');
        const json = await response.json()

        const emailID = await SecureStore.getItemAsync("email")

        const ids_response = await fetch(`http://192.168.29.84/software_project/current_api_bookmarks`, {
            method: "post",
            body: JSON.stringify({ email: emailID }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const ids_json = await ids_response.json()

        // Fixing Typo
        const questions = json.results.map(question => ({
            ...question,
            question: question.question
                .replace(/&quot;/g, "'")
                .replace(/&Eacute;/g, "É")
                .replace(/&oacute;/g, "ó")
                .replace(/&#039;/g, "'")
        }))

        setQuestions(questions)
        setApi_Bookmarks_Ids(ids_json)

        navigation.navigate("Science", {
            data: {
                questions: questions,
                bookmarked_questions: api_bookmarks_ids
            }
        })
    }

    const fetchQuestions_Politics = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=30&category=24&type=multiple');
        const json = await response.json()

        const emailID = await SecureStore.getItemAsync("email")

        const ids_response = await fetch(`http://192.168.29.84/software_project/current_api_bookmarks`, {
            method: "post",
            body: JSON.stringify({ email: emailID }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const ids_json = await ids_response.json()

        // Fixing Typo
        const questions = json.results.map(question => ({
            ...question,
            question: question.question
                .replace(/&quot;/g, "'")
                .replace(/&Eacute;/g, "É")
                .replace(/&oacute;/g, "ó")
                .replace(/&#039;/g, "'")
        }))

        setQuestions(questions)
        setApi_Bookmarks_Ids(ids_json)

        navigation.navigate("Politics", {
            data: {
                questions: questions,
                bookmarked_questions: api_bookmarks_ids
            }
        })
    }

    const fetchQuestions_Geography = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=22&type=multiple');
        const json = await response.json()

        const emailID = await SecureStore.getItemAsync("email")

        const ids_response = await fetch(`http://192.168.29.84/software_project/current_api_bookmarks`, {
            method: "post",
            body: JSON.stringify({ email: emailID }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const ids_json = await ids_response.json()

        // Fixing Typo
        const questions = json.results.map(question => ({
            ...question,
            question: question.question
                .replace(/&quot;/g, "'")
                .replace(/&Eacute;/g, "É")
                .replace(/&oacute;/g, "ó")
                .replace(/&#039;/g, "'")
        }))

        setQuestions(questions)
        setApi_Bookmarks_Ids(ids_json)

        navigation.navigate("Geography", {
            data: {
                questions: questions,
                bookmarked_questions: api_bookmarks_ids
            }
        })
    }

    const fetchQuestions_History = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=23&type=multiple');
        const json = await response.json()

        const emailID = await SecureStore.getItemAsync("email")

        const ids_response = await fetch(`http://192.168.29.84/software_project/current_api_bookmarks`, {
            method: "post",
            body: JSON.stringify({ email: emailID }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const ids_json = await ids_response.json()

        // Fixing Typo
        const questions = json.results.map(question => ({
            ...question,
            question: question.question
                .replace(/&quot;/g, "'")
                .replace(/&Eacute;/g, "É")
                .replace(/&oacute;/g, "ó")
                .replace(/&#039;/g, "'")
        }))

        setQuestions(questions)
        setApi_Bookmarks_Ids(ids_json)

        navigation.navigate("History", {
            data: {
                questions: questions,
                bookmarked_questions: api_bookmarks_ids
            }
        })
    }

    const fetchQuestions_Sports = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=21&type=multiple');
        const json = await response.json()

        const emailID = await SecureStore.getItemAsync("email")

        const ids_response = await fetch(`http://192.168.29.84/software_project/current_api_bookmarks`, {
            method: "post",
            body: JSON.stringify({ email: emailID }),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        const ids_json = await ids_response.json()

        // Fixing Typo
        const questions = json.results.map(question => ({
            ...question,
            question: question.question
                .replace(/&quot;/g, "'")
                .replace(/&Eacute;/g, "É")
                .replace(/&oacute;/g, "ó")
                .replace(/&#039;/g, "'")

        }))

        setQuestions(questions)
        setApi_Bookmarks_Ids(ids_json)

        navigation.navigate("Sports", {
            data: {
                questions: questions,
                bookmarked_questions: api_bookmarks_ids
            }
        })
    }

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.gkButton} onPress={fetchQuestions_General_Knowledge}>
                    <FontAwesome5 style={styles.icon} name="book" size={40} color='#ffffff' />
                    <Text style={styles.gkButtonText}>General Knowledge</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={fetchQuestions_Entertainment}>
                    <FontAwesome5 style={styles.icon} name="film" size={40} color='#ffffff' />
                    <Text style={styles.buttonText}>Entertainment</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.button} onPress={fetchQuestions_Science}>
                    <FontAwesome5 style={styles.icon} name="flask" size={40} color='#ffffff' />
                    <Text style={styles.buttonText}>Science</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={fetchQuestions_Politics}>
                    <FontAwesome5 style={styles.icon} name="handshake" size={40} color='#ffffff' />
                    <Text style={styles.buttonText}>Politics</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.button} onPress={fetchQuestions_Geography}>
                    <FontAwesome5 style={styles.icon} name="map" size={40} color='#ffffff' />
                    <Text style={styles.buttonText}>Geography</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={fetchQuestions_History}>
                    <FontAwesome5 style={styles.icon} name="landmark" size={40} color='#ffffff' />
                    <Text style={styles.buttonText}>History</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.lastButton} onPress={fetchQuestions_Sports}>
                <MaterialIcons style={styles.icon} name="sports-tennis" size={40} color='#ffffff' />
                <Text style={styles.lastButtonText}>Sports</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },
    gkButton: {
        backgroundColor: '#007bff',
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: "#000",
        width: 150,
        height: 150,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    gkButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: 25
    },
    button: {
        backgroundColor: '#007bff',
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: "#000",
        width: 150,
        height: 150,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: 35
    },
    icon: {
        marginTop: 25
    },
    lastButton: {
        backgroundColor: '#007bff',
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        width: 150,
        height: 150,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    lastButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginTop: 20
    },
})
