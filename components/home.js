import { StyleSheet } from "react-native"
import Tab_one from "./tab_one";
import AddQuestion from "./addQuestion";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import User from "./user"
import User_helper from "./user_helper"

const Stack = createNativeStackNavigator();
const User_Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Question_One_Tab = ({ navigation }) => {
    return (
        <NavigationContainer style={styles.container} independent={true}>
            <Stack.Navigator initialRouteName="Single Correct MCQs" screenOptions={{

                headerTitleStyle: {
                    fontSize: 22,
                    color: '#000000'
                },

                headerTitleAlign: 'center'

            }}>
                <Stack.Screen name="Single Correct MCQs" component={Tab_one} options={{ headerShown: true }} />
                <Stack.Screen name="Add Question" component={AddQuestion} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const User_Tab = ({ navigation }) => {
    return (
        <NavigationContainer style={styles.container} independent={true}>
            <User_Stack.Navigator initialRouteName="User Profile" screenOptions={{

                headerTitleStyle: {
                    fontSize: 22,
                    color: '#000000'
                },

                headerTitleAlign: 'center'

            }}>
                <User_Stack.Screen name="User Profile" component={User} options={{ headerShown: true }} />
                <User_Stack.Screen name="User_helper" component={User_helper} options={{ headerShown: true }} />
            </User_Stack.Navigator>
        </NavigationContainer>
    )
}

export default function Home({ navigation }) {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Question_One_Tab" component={Question_One_Tab} options={{ headerShown: false }} />
                <Tab.Screen name="User" component={User_Tab} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})