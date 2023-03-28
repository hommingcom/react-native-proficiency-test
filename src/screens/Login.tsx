import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import { LoginReq } from '../utils/interfaces'
import { LOGIN_ENDPOINT } from '../utils/endpoints'

const deviceName = 'OMG Android Virtual Device'

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const requestLogin = async () => {
    try {
      const loginReq: LoginReq = { device_name: deviceName, email, password }
      const response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginReq),
      })
      if (!response.ok) {
        throw new Error('No se pudo iniciar sesión')
      }
      const responseJson = await response.json()
      // console.log(responseJson)
      const token = responseJson.data.plainTextToken
      console.log(`El token es: ${token}`)
      navigation.navigate('Inmuebles', { token })
    } catch {
      Alert.alert(
        'Error',
        'No se pudo iniciar sesión. Por favor, verifica tus credenciales e intenta de nuevo.',
      )
    }
  }

  const isButtonDisabled = email === '' || password === ''

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="center"
          source={require('../assets/logo.png')}
          style={{ height: 85, width: 360 }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.texttittle}>Iniciar sesión</Text>
        <Text style={styles.text}>Correo electrónico</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.text}>Contraseña</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={{
            backgroundColor: isButtonDisabled ? 'gray' : '#58b78f',
            borderRadius: 5,
            justifyContent: 'center',
            marginVertical: 10,
            height: 40,
            opacity: isButtonDisabled ? 0.2 : 1,
          }}
          onPress={requestLogin}
          disabled={isButtonDisabled}>
          <Text style={styles.textButton}>INICIAR SESIÓN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: '15%',
  },
  texttittle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 5,
    paddingLeft: 10,
  },
  textButton: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
