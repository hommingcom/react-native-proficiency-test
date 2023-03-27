import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useState from 'react';
import { useAuth } from '../hooks/useAuth';

const HomeScreen: React.FC = () => {
 
  const {token} = useAuth();

useEffect(() => {
  
}, [token])
  return (
    <View style={styles.container}>
      <Text>Properties Screen: {token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;