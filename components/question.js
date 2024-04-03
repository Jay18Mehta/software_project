import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'

const FlatList_Item = (props) => {
    const { question, options, correct } = props
    const [selectedOption, setSelectedOption] = useState(-1) // selectedOption is the index of option selected.

    const handleOptionPress = (optionIndex) => {

        if(optionIndex == selectedOption){
            setSelectedOption(-1)
        }
        else{
            setSelectedOption(optionIndex)
        }
        
    }

    return (

        <View style={styles.itemContainer}>
            <Text style={styles.questionText}>{question}</Text>

            {options.map((option, index) => (

                <TouchableOpacity
                    key={index}
                    style={[
                        styles.option,
                        selectedOption == index && styles.selectedOption,
                    ]}
                    onPress={() => handleOptionPress(index)}
                >
                    <Text
                        style={[
                            styles.optionText,
                            selectedOption == index && styles.selectedOptionText,
                        ]}
                    >
                        {option}
                    </Text>
                </TouchableOpacity>

            ))}

            <View style={styles.submit}>
                <TouchableOpacity >
                    <Text style={styles.submitText}>Submit</Text>
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
        paddingTop: 20,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 3,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000000',
    },
    option: {
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 5,
        padding: 14,
        backgroundColor: '#ffffff',
    },
    optionText: {
        fontSize: 16,
        color: '#FF220B',
    },
    selectedOption: {
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
    },
    selectedOptionText: {
        color: '#ffffff',
    },
    submit: {
        height: 35,
        width : 70,
        marginTop: 16,
        backgroundColor: '#00BFFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})

export default Question;
