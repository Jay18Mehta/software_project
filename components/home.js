import { View,Text, Pressable,StyleSheet} from "react-native"
import { useState,useEffect } from "react";
import Question from "./question";
import { useIsFocused } from "@react-navigation/native";
import Tab_one from "./tab_one";
import AddQuestion from "./addQuestion";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from "./user";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Question_One_Tab = ()=>{
    return (
        <NavigationContainer style={styles.container} independent={true}>
            <Stack.Navigator initialRouteName="Tab_one">
            <Stack.Screen name="Tab_one" component={Tab_one} options={{ headerShown: false }}/>
            <Stack.Screen name = "AddQuestion" component={AddQuestion}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function Home({navigation}){
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Question_One_Tab" component={Question_One_Tab} />
                <Tab.Screen name="User" component={User} />
            </Tab.Navigator>
        </NavigationContainer>
        // <Question_One_Tab/>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });