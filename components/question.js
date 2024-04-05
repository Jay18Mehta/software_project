import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'

const FlatList_Item = (props) => {
    const { question, options, correct } = props
    const [selectedOption, setSelectedOption] = useState(-1) // selectedOption is the index of option selected.
    const [isCorrect, setIsCorrect] = useState(-1) // -1 -> Not Answered , 0 -> Incorrect Answer , 1 -> Correct Answer

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

    return (

        <View
            style={[
                styles.itemContainer,
                isCorrect == 1 && styles.correctItemContainer,
                isCorrect == 0 && styles.incorrectItemContainer
            ]}>

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

const Question = ({ questions }) => {

    const renderItem = ({ item }) => {

        return (
            <FlatList_Item
                question={item.question}
                options={item.options}
                correct={item.correct}
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
        elevation: 3
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

export default Question;