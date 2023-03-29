import {LoginResponse} from './interfaces';
import {PropertyResponse} from './interfaces';
import {Alert} from 'react-native';

export async function login(
  deviceName: string,
  email: string,
  password: string
): Promise<LoginResponse | null> {
  try {
    const response = await fetch('https://dev.homming.com/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({device_name: deviceName, email, password})
    });

    if (response.ok) {
      const data = (await response.json()) as LoginResponse;
      return data;
    } else {
      //Maybe in a more complex example I would return an error instead an alert to separate UI layer and server layer
      Alert.alert('Error', 'Login failed. Please check your credentials.');
      return null;
    }
  } catch (error) {
    Alert.alert('Error', 'An error occurred while logging in.');
    return null;
  }
}

export async function getProperties(
  token: string
): Promise<PropertyResponse | null> {
  try {
    const response = await fetch(
      'https://dev.homming.com/api/manager/properties',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      const data = (await response.json()) as PropertyResponse;
      return data;
    } else {
      Alert.alert('Error', 'Login failed. Please check your credentials.');
      return null;
    }
  } catch (error) {
    Alert.alert('Error', 'An error occurred while logging in.');
    return null;
  }
}
