import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Login } from './screens'

type RootStackParamList = {
  Login: undefined
  Inmuebles: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'Inmuebles'} component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default App
