import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useState } from "react"
import * as SecureStore from 'expo-secure-store'

export default function TabTwo({ navigation }) {
    const [questions, setQuestions] = useState([])
    const [api_bookmarks_ids, setApi_Bookmarks_Ids] = useState([])

    const fetchQuestions_General_Knowledge = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=9&type=multiple');
        const json = await response.json()

        const emailID = await SecureStore.getItemAsync("email")

        const ids_response = await fetch(`http://172.31.52.60/software_project/current_api_bookmarks`, {
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

        console.log(json.results)

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

        navigation.navigate("Entertainment", {
            data: {
                questions: questions
            }
        })
    }

    const fetchQuestions_Science = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=17&type=multiple');
        const json = await response.json()

        console.log(json.results)

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

        navigation.navigate("Science", {
            data: {
                questions: questions
            }
        })
    }

    const fetchQuestions_Politics = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=30&category=24&type=multiple');
        const json = await response.json()

        console.log(json.results)

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

        navigation.navigate("Politics", {
            data: {
                questions: questions
            }
        })
    }

    const fetchQuestions_Geography = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=22&type=multiple');
        const json = await response.json()

        console.log(json.results)

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

        navigation.navigate("Geography", {
            data: {
                questions: questions
            }
        })
    }

    const fetchQuestions_History = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=23&type=multiple');
        const json = await response.json()

        console.log(json.results)

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

        navigation.navigate("History", {
            data: {
                questions: questions
            }
        })
    }

    const fetchQuestions_Sports = async () => {
        // API call
        const response = await fetch('https://www.otriviata.com/api.php?amount=50&category=21&type=multiple');
        const json = await response.json()

        console.log(json.results)

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

        navigation.navigate("Sports", {
            data: {
                questions: questions
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Category Of Questions</Text>
            <TouchableOpacity style={styles.button} onPress={fetchQuestions_General_Knowledge}>
                <Text style={styles.buttonText}>General Knowledge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={fetchQuestions_Entertainment}>
                <Text style={styles.buttonText}>Entertainment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={fetchQuestions_Science}>
                <Text style={styles.buttonText}>Science</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={fetchQuestions_Politics}>
                <Text style={styles.buttonText}>Politics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={fetchQuestions_Geography}>
                <Text style={styles.buttonText}>Geography</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={fetchQuestions_History}>
                <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={fetchQuestions_Sports}>
                <Text style={styles.buttonText}>Sports</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,  // Add some padding to the container
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,  
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        marginVertical: 10,  
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
