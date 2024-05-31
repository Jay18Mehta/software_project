import { View, TextInput, StyleSheet, Pressable, Text } from "react-native"
import { useState } from "react"
import * as SecureStore from 'expo-secure-store'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function AddQuestion({ navigation }) {
    const [question, setQuestion] = useState("")
    const [option1, setOption1] = useState("")
    const [option2, setOption2] = useState("")
    const [option3, setOption3] = useState("")
    const [option4, setOption4] = useState("")
    const [correctOption, setCorrectOption] = useState("")
    const [category, setCategory] = useState("")

    const categoryData = [
        { label: 'General Knowledge', value: 'General Knowledge' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Science', value: 'Science' },
        { label: 'Politics', value: 'Politics' },
        { label: 'Geography', value: 'Geography' },
        { label: 'History', value: 'History' },
        { label: 'Sports', value: 'Sports' },
        { label: 'Others', value: 'Others' }
    ]

    const correctOptionData = [
        { label: option1, value: option1 },
        { label: option2, value: option2 },
        { label: option3, value: option3 },
        { label: option4, value: option4 }
    ].filter(option => option.label.trim() !== "" && option.label.trim() !== null)
    

    const addQuestion = async (e) => {
        // console.log(question)
        e.preventDefault()
        const user_email = await SecureStore.getItemAsync("email")
        // Api Call
        const response = await fetch(`http://192.168.29.84/software_project/addQuestions`, {  
            method: "post",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ question: question, options: [option1, option2, option3, option4], correct: correctOption, email: user_email, category: category })
        })
        const json = await response.json()
        navigation.navigate('Asked MCQs')
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>

                <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={categoryData}
                    search={true}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Category'}
                    searchPlaceholder="Search..."
                    value={category}
                    onChange={item => {
                        setCategory(item.value)
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />

                <TextInput onChangeText={setQuestion} value={question} style={styles.question} placeholder="Question" />
                <TextInput onChangeText={setOption1} value={option1} style={styles.input} placeholder="Option 1" />
                <TextInput onChangeText={setOption2} value={option2} style={styles.input} placeholder="Option 2" />
                <TextInput onChangeText={setOption3} value={option3} style={styles.input} placeholder="Option 3" />
                <TextInput onChangeText={setOption4} value={option4} style={styles.input} placeholder="Option 4" />

                <Dropdown
                    style={[styles.correct]}
                    inputSearchStyle={styles.inputSearchStyle}
                    placeholderStyle={styles.placeholderCorrectStyle}
                    data={correctOptionData}
                    search={true}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={"Correct Option"}
                    searchPlaceholder="Search..."
                    value={correctOption}
                    onChange={item => {
                        setCorrectOption(item.value)
                    }} 
                />

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
        marginBottom: 8
    },
    question: {
        height: 40,
        marginTop: 16,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    input: {
        height: 40,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
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
    },
    dropdown: {
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#9E9E9E',
    },
    selectedTextStyle: {
        fontSize: 16
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    },
    placeholderCorrectStyle: {
        color: '#9E9E9E'
    }
})