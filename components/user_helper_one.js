import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'

const FlatList_Item = (props) => {
    const { question, options, correct, questionId, category, UpvoteInstantiation, DownvoteInstantiation } = props

    const [selectedOption, setSelectedOption] = useState(-1) // selectedOption is the index of option selected.
    const [isCorrect, setIsCorrect] = useState(-1) // -1 -> Not Answered , 0 -> Incorrect Answer , 1 -> Correct Answer
    const [isBookmarked, setIsBookmarked] = useState(true)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [isDownvoted, setIsDownvoted] = useState(false)

    useEffect(() => {
        setIsUpvoted(UpvoteInstantiation)
        setIsDownvoted(DownvoteInstantiation)
    }, [UpvoteInstantiation, DownvoteInstantiation])

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

        setIsBookmarked(false)

        const response = await fetch(`http://172.31.52.60/software_project/remove_bookmark`, {   //Ansh =>172.31.52.60, Jay => 172.31.52.60
            method: "post",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ questionId: questionId, email: email })
        })

    }

    const handleUpvotePress = async (questionId) => {

        const email = await SecureStore.getItemAsync("email")

        if (!isUpvoted && !isDownvoted) {
            setIsUpvoted(true)
        }
        else if (!isUpvoted && isDownvoted) {
            setIsUpvoted(true)
            setIsDownvoted(false)
        }
        else {
            setIsUpvoted(false)
        }

        const response = await fetch(`http://172.31.52.60/software_project/upvote`, {   //Ansh =>172.31.52.60, Jay => 172.31.52.60
            method: "post",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ questionId: questionId, email: email })
        })
    }

    const handleDownvotePress = async () => {

        const email = await SecureStore.getItemAsync("email")

        if (!isUpvoted && !isDownvoted) {
            setIsDownvoted(true)
        }
        else if (isUpvoted && !isDownvoted) {
            setIsDownvoted(true)
            setIsUpvoted(false)
        }
        else {
            setIsDownvoted(false)
        }

        const response = await fetch(`http://172.31.52.60/software_project/downvote`, {   //Ansh =>172.31.52.60, Jay => 172.31.52.60
            method: "post",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ questionId: questionId, email: email })
        })

    }

    return (

        <View
            style={[
                styles.itemContainer,
                isCorrect == 1 && styles.correctItemContainer,
                isCorrect == 0 && styles.incorrectItemContainer
            ]}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => handleUpvotePress(questionId)}>
                        {isUpvoted ? <FontAwesome style={styles.upvoteTrue} name={'arrow-up'} size={30} />
                            : <FontAwesome style={styles.upvoteFalse} name={'arrow-up'} size={30} />}
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginLeft: 6 }} onPress={() => handleDownvotePress(questionId)}>
                        {isDownvoted ? <FontAwesome style={styles.downvoteTrue} name={'arrow-down'} size={30} />
                            : <FontAwesome style={styles.downvoteFalse} name={'arrow-down'} size={30} />}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => handleBookmarkPress(questionId)}>
                    {isBookmarked ? <FontAwesome name={'bookmark'} size={30} color='#00BFFF' />
                        : <FontAwesome name={'bookmark-o'} size={30} color='#000000' />}
                </TouchableOpacity>
            </View>

            <Text style={styles.category}>{category}</Text>

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

export default function User_helper_One({ route, navigation }) {
    const { downvoted_questions, questions, upvoted_questions } = route.params.data

    const renderItem = ({ item }) => {

        return (
            <FlatList_Item
                question={item.question}
                options={item.options}
                correct={item.correct}
                questionId={item._id}
                category={item.category}
                UpvoteInstantiation={upvoted_questions.includes(item._id)}
                DownvoteInstantiation={downvoted_questions.includes(item._id)}
            />
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={questions}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
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
    correctItemContainer: {
        borderColor: '#4CAF50',
        borderWidth: 3
    },
    incorrectItemContainer: {
        borderColor: '#FF220B',
        borderWidth: 3
    },
    category: {
        fontSize: 14,
        color: '#808080',
        fontStyle: 'italic',
        marginTop: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#808080',
        paddingVertical: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        alignSelf: 'flex-start',
        maxWidth: '80%',
    },
    questionText: {
        marginTop: 5,
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
    },
    upvoteTrue: {
        color: '#06DE2A'
    },
    upvoteFalse: {
        color: '#908C8C'
    },
    downvoteTrue: {
        color: '#F63C05'
    },
    downvoteFalse: {
        color: '#908C8C'
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
    },
    dropdown: {
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: '#ffffff',
        width: 215
    },
    removeFilter: {
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
        width: 115,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeFilterText: {
        color: '#9E9E9E'
    }
})