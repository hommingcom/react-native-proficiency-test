import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../App';
import useState from 'react';

const HomeScreen: React.FC = () => {
  //Interface | null in the <>
  /* const [properties, setProperties] = useState<[] | null>(null) */
  const {token} = useContext(AuthContext)

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