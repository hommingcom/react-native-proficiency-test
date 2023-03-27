import React, { useState } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

type RootStackParamList = {
  Login: undefined;
  Home: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export const AuthContext = React.createContext<{token: string | null, setToken: React.Dispatch<React.SetStateAction<string | null>>}>({token: null, setToken: () => {}})

const App = (): JSX.Element  => {
  const [token, setToken] = useState<string | null>(null)

  return (
<AuthContext.Provider value={{token, setToken }}>
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'Home'} component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
</AuthContext.Provider>
)
}

export default App;

