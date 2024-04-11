import {StyleSheet} from "react-native"
import Tab_one from "./tab_one";
import AddQuestion from "./addQuestion";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from "./user";
import User_helper from "./user_helper";

const Stack = createNativeStackNavigator();
const User_Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Question_One_Tab = ({navigation})=>{
    return (
        <NavigationContainer style={styles.container} independent={true}>
            <Stack.Navigator initialRouteName="Tab_one">
            <Stack.Screen name="Tab_one" component={Tab_one} options={{ headerShown: false }}/>
            <Stack.Screen name = "AddQuestion" component={AddQuestion}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const User_Tab = ({navigation})=>{
    return (
        <NavigationContainer style={styles.container} independent={true}>
            <User_Stack.Navigator initialRouteName="User">
            <User_Stack.Screen name="User" component={User}/>
            <User_Stack.Screen name = "User_helper" component={User_helper}/>
            </User_Stack.Navigator>
        </NavigationContainer>
    )
}

export default function Home({navigation}){
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Question_One_Tab" component={Question_One_Tab} />
                <Tab.Screen name="User" component={User_Tab} options={{ headerShown: false }}/>
            </Tab.Navigator>
        </NavigationContainer>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });