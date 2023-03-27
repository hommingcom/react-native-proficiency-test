import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../App';
import { login } from '../utils/services';

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
  //We omit the first argument since we won't be needing it (token)
  const {setToken} = useContext(AuthContext);
  const deviceName = "homming";

  const onSubmit = async () => {
    // Perform the login request and store the bearer token
    const data = await login(deviceName, email, password);
    if( data) {
    setToken(data.data.plainTextToken)
    // Save the token securely
    // Navigate to the Properties screen (Home)
    navigation.navigate('Home');
  }
   
  };

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