import {LoginResponse} from './interfaces';
import {PropertyResponse} from './interfaces';
import {Alert} from 'react-native';

/**
 * Attempts to log in a user using their email and password, along with a device name.
 * Sends a POST request to the server with the provided credentials.
 * If the response is successful, returns the login data as a LoginResponse object.
 * If the response is unsuccessful, shows an alert with an error message and returns null.
 * If an exception occurs during the request, shows an alert with an error message and returns null.
 *
 * @param {string} deviceName - The name of the device the user is logging in from, in our case I've setted homming
 * @param {string} email - The email address of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @returns  A promise that resolves to a LoginResponse object if successful, null if unsuccessful or an error occurs.
 */
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
      //Maybe in a more complex example I would return an error instead an alert to separate UI layer and server layer, I will let is as an Alert so far.
      Alert.alert('Error', 'Login failed. Please check your credentials.');
      return null;
    }
  } catch (error) {
    Alert.alert('Error', 'An error occurred while logging in.');
    return null;
  }
}

/**
 * Fetches the properties for the user from the API
 *
 * @param {string} token - The access token to authenticate the request.
 * @returns Returns a Promise that resolves to a PropertyResponse object if the request is successful, an Error object if there is an error, or null if the response is not right
 */

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
