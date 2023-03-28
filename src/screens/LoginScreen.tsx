import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from '../utils/services';
import { useAuth } from '../hooks/useAuth';

//Defining the types of the nav stack, the LoginScreen props and navigation prop
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //We omit the first argument since we won't be needing it (token); and we get the setToken funct from useAuth hook
  const {setToken} = useAuth();
  //I just defined this constant as homming, it's just the device's name, could have been anything
  const deviceName = "homming";

  //Now we'll handle the login process
  const onSubmit = async () => {
    // Perform the login request and store the bearer token
    const data = await login(deviceName, email, password);
    if( data) {
    //We update the token
    setToken(data.data.plainTextToken)
    // Save the token securely and then Navigate to the Properties screen (Home)
    navigation.navigate('Home');
  }
   
  };

  //Then we render the loginScreen with the Inputs and Button from react-native-elements
  return (
    <View style={styles.container}>
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        containerStyle={styles.input}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
        containerStyle={styles.input}
      />
      <Button title="Login" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
  },
});

export default LoginScreen;