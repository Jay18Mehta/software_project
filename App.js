import { StyleSheet} from 'react-native'

import Home from "./components/home"
import Login from './components/login'

import { useEffect ,useState} from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';

import "expo-dev-client"

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(true)
  useEffect(()=>{
    async function checkIsLoggedIn(){
      if(await SecureStore.getItemAsync("email")){
        setIsLoggedIn(true)
      }
      else{
        setIsLoggedIn(false)
      }
    }
    checkIsLoggedIn()
  },[])
  return (
    // <Home/>
    <NavigationContainer style={styles.container} independent={true}>
        <Stack.Navigator initialRouteName={!isLoggedIn ? "Login" : "Home"}>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name = "Login" component={Login}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
