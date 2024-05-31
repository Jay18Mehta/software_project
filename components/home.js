import { StyleSheet } from "react-native"
import Tab_one from "./tab_one";
import AddQuestion from "./addQuestion";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import User from "./user"
import User_helper_One from "./user_helper_one";
import Tab_two from "./tab_two"
import API_Question from "./api_question"
import User_helper_Two from "./user_helper_two";
import User_helper_Three from "./user_helper_three";

const Stack = createNativeStackNavigator();
const User_Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Question_One_Tab = ({ navigation }) => {
    return (
        <NavigationContainer style={styles.container} independent={true}>
            <Stack.Navigator initialRouteName="Asked MCQs" screenOptions={{

                headerTitleStyle: {
                    fontSize: 22,
                    color: '#000000'
                },

                headerTitleAlign: 'center'

            }}>
                <Stack.Screen name="Asked MCQs" component={Tab_one} options={{ headerShown: true }} />
                <Stack.Screen name="Add Question" component={AddQuestion} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Question_Two_Tab = ({ navigation }) => {
    return (
        <NavigationContainer style={styles.container} independent={true}>
            <Stack.Navigator initialRouteName="Practise MCQs" screenOptions={{

                headerTitleStyle: {
                    fontSize: 22,
                    color: '#000000'
                },

                headerTitleAlign: 'center'

            }}>
                <Stack.Screen name="Practise MCQs" component={Tab_two} options={{ headerShown: true }} />
                <Stack.Screen name="General Knowledge" component={API_Question} options={{ headerShown: true }} />
                <Stack.Screen name="Entertainment" component={API_Question} options={{ headerShown: true }} />
                <Stack.Screen name="Science" component={API_Question} options={{ headerShown: true }} />
                <Stack.Screen name="Politics" component={API_Question} options={{ headerShown: true }} />
                <Stack.Screen name="Geography" component={API_Question} options={{ headerShown: true }} />
                <Stack.Screen name="History" component={API_Question} options={{ headerShown: true }} />
                <Stack.Screen name="Sports" component={API_Question} options={{ headerShown: true }} />
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
                <User_Stack.Screen name="Bookmarked : Asked" component={User_helper_One} options={{ headerShown: true }} />
                <User_Stack.Screen name="Bookmarked : Practice" component={User_helper_Two} options={{ headerShown: true }} />
                <User_Stack.Screen name="Your Asked Questions" component={User_helper_Three} options={{ headerShown: true }} />
            </User_Stack.Navigator>
        </NavigationContainer>
    )
}

export default function Home({ navigation }) {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Question_One_Tab" component={Question_One_Tab} options={{ headerShown: false }} />
                <Tab.Screen name="Question_two_tab" component={Question_Two_Tab} options={{ headerShown: false }} />
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