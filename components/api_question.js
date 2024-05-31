import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'

const FlatList_Item = (props) => {
    const { question, options, correct, questionId, diffculty, BookmarkInstantiation } = props

    const [selectedOption, setSelectedOption] = useState(-1) // selectedOption is the index of option selected.
    const [isCorrect, setIsCorrect] = useState(-1) // -1 -> Not Answered , 0 -> Incorrect Answer , 1 -> Correct Answer
    const [isBookmarked, setIsBookmarked] = useState(false)

    //BookmarkInstantiation dependency is passed to overcom false instantiation.
    useEffect(() => {
        setIsBookmarked(BookmarkInstantiation)
    }, [BookmarkInstantiation])


    const handleOptionPress = (optionIndex) => {

        setIsCorrect(-1)

        if (optionIndex == selectedOption) {
            setSelectedOption(-1)
        }
        else {
            setSelectedOption(optionIndex)
        }

    }

    const handleSubmitPress = () => {

        if (selectedOption == -1) {
            return
        }

        if (options[selectedOption] == correct) {
            setIsCorrect(1)

        }
        else {
            setIsCorrect(0)
        }
    }

    const handleBookmarkPress = async (questionId) => {

        const email = await SecureStore.getItemAsync("email")

        if (isBookmarked) {

            setIsBookmarked(false)

        }
        else {

            setIsBookmarked(true)

        }

        const response = await fetch(`http://192.168.29.84/software_project/api_bookmark`, {   
            method: "post",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ id: questionId, email: email, question: question, options: options, correct: correct })
        })

        const json = await response.json()

    }

    return (

        <View
            style={[
                styles.itemContainer,
                isCorrect == 1 && styles.correctItemContainer,
                isCorrect == 0 && styles.incorrectItemContainer
            ]}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[
                    diffculty == 'Easy' && styles.easyDiffculty,
                    diffculty == 'Medium' && styles.mediumDiffculty,
                    diffculty == 'Hard' && styles.hardDiffculty
                ]}>{diffculty}</Text>

                <TouchableOpacity onPress={() => handleBookmarkPress(questionId)}>
                    {isBookmarked ? <FontAwesome name={'bookmark'} size={30} color='#00BFFF' />
                        : <FontAwesome name={'bookmark-o'} size={30} color='#000000' />}
                </TouchableOpacity>
            </View>

            <Text style={styles.questionText}>{question}</Text>

            {options.map((option, index) => (

                <TouchableOpacity
                    key={index}
                    style={[
                        styles.option,
                        selectedOption == index && styles.selectedOption,
                        isCorrect != -1 && options[index] == correct && styles.correctOption,
                        isCorrect == 0 && selectedOption == index && styles.incorrectOption
                    ]}
                    onPress={() => handleOptionPress(index)}
                >
                    <Text
                        style={[
                            styles.optionText,
                            selectedOption == index && styles.selectedOptionText,
                            isCorrect != -1 && options[index] == correct && styles.correctOptionText,
                            isCorrect == 0 && selectedOption == index && styles.incorrectOption
                        ]}
                    >
                        {option}
                    </Text>
                </TouchableOpacity>

            ))}

            <View style={styles.submit}>
                <TouchableOpacity >
                    <Text style={styles.submitText} onPress={() => handleSubmitPress()}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const API_Question = ({ route, navigation }) => {
    const { questions,bookmarked_questions } = route.params.data

    const renderItem = ({ item }) => {

        options = item.incorrect_answers

        if (options.length == 3) {
            const CorrectIndex = Math.floor(Math.random() * 4)

            if (CorrectIndex == 3) {
                options.push(item.correct_answer)
            }
            else {
                const temp = options[CorrectIndex]
                options[CorrectIndex] = item.correct_answer
                options.push(temp)
            }

        }

        var difficulty = ''

        if(item.difficulty == 'easy' ){

            difficulty = 'Easy'

        }
        else if(item.difficulty == 'medium'){

            difficulty = 'Medium'

        }
        else{

            difficulty = 'Hard'

        }

        return (
            <FlatList_Item
                question={item.question}
                options={options}
                correct={item.correct_answer}
                questionId={item.id}
                diffculty={difficulty}
                BookmarkInstantiation={bookmarked_questions.includes(item.id)}
            />
        )
    }

    return (

        <View style={styles.container} >
            <FlatList
                data={questions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        paddingTop: 20
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 3,
        marginTop: 20
    },
    easyDiffculty: {
        fontSize: 15,
        color: '#19D20D',
        fontStyle: 'italic',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#19D20D',
        paddingVertical: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        alignSelf: 'flex-start',
        maxWidth: '80%',
        fontWeight: 'bold'
    },
    mediumDiffculty: {
        fontSize: 15,
        color: '#FFB800',
        fontStyle: 'italic',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#FFB800',
        paddingVertical: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        alignSelf: 'flex-start',
        maxWidth: '80%',
        fontWeight: 'bold'
    },
    hardDiffculty: {
        fontSize: 15,
        color: '#F00909',
        fontStyle: 'italic',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#F00909',
        paddingVertical: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        alignSelf: 'flex-start',
        maxWidth: '80%',
        fontWeight: 'bold'
    },
    correctItemContainer: {
        borderColor: '#4CAF50',
        borderWidth: 3
    },
    incorrectItemContainer: {
        borderColor: '#FF220B',
        borderWidth: 3
    },
    questionText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000000'
    },
    option: {
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 5,
        padding: 14,
        backgroundColor: '#ffffff'
    },
    optionText: {
        fontSize: 16,
        color: '#FF220B'
    },
    selectedOption: {
        borderColor: '#00BFFF',
        backgroundColor: '#E3F2FD'
    },
    selectedOptionText: {
        color: '#000'
    },
    correctOption: {
        borderColor: '#4CAF50',
        backgroundColor: '#C8E6C9'
    },
    correctOptionText: {
        color: '#000',
    },
    incorrectOption: {
        borderColor: '#FF220B',
        backgroundColor: '#FFCDD2'
    },
    incorrectOptionText: {
        color: '#000'
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
    }
})

export default API_Question;