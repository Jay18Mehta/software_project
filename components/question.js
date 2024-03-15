import { View,Text } from "react-native"

export default function Question({question}){
    return (
        <View>
            <Text>{question.question}</Text>
            <Text>{question.options}</Text>
            <Text>{question.correct}</Text>
        </View>
    )
}