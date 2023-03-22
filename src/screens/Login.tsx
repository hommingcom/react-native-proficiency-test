import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native/types'
import { LOGIN_ENDPOINT } from '../utils/endpoints';

type RootStackParamList = {
    Login: undefined;
    Home: { token: string }
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
  
    const submit = async () => {
      try {
        const result = await fetch(LOGIN_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        if (result.status === 200) {
          const value = result.json();
          navigation.navigate("Home", { token: value as string });
        } else {
            Alert.alert('ERROR', 'Email o contraseña incorrecto.', [
                {
                  text: 'Cerrar',
                  style: 'cancel',
                },
            ]);
        }
      } catch (error) {
        Alert.alert('ERROR', 'Email o contraseña incorrecto.', [
            {
              text: 'Cerrar',
              style: 'cancel',
            },
        ]);
      }
    };
  
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          padding: 20,
        }}
      >
        <Image
          style={{
            width: Dimensions.get("window").width * 0.8,
            height: 150,
            alignSelf: "center",
          }}
          source={require("./assets/logo.png")}
          resizeMode={"contain"}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Iniciar sesión</Text>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: "500", marginBottom: 5 }}>
            Correo electrónico
          </Text>
  
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/email.png")}
              resizeMode={"contain"}
            />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              autoCorrect={false}
              placeholder={"juan@correo.com"}
            />
          </View>
        </View>
  
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: "500", marginBottom: 5 }}>
            Contraseña
          </Text>
  
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/password.png")}
              resizeMode={"contain"}
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              autoCorrect={false}
              secureTextEntry={!visible}
              placeholder={"********"}
            />
            <TouchableOpacity
              onPress={() => setVisible((prevState) => !prevState)}
            >
              <Image
                style={styles.icon}
                source={
                  visible
                    ? require("../../assets/showPassword.png")
                    : require("../../assets/hidePassword.png")
                }
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
        </View>
  
        <Button
          onPress={submit}
          title="Iniciar sesión"
          color="#009066"
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      height: 40,
      borderWidth: 0,
      flex: 1,
    },
    icon: {
      width: 20,
      height: 20,
      marginHorizontal: 10,
      tintColor: "rgba(0, 0, 0, 0.5)",
    },
  });
  

export default Login
