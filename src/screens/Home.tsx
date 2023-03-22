import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Button, Text, ScrollView, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native/types'
import { PROPERTIES_ENDPOINT } from '../utils/endpoints';

type RootStackParamList = {
    Login: undefined;
    Home: { token: string }
};

type PropertiesProps = {
    title: string;
    properties: Array<string>
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Home = ({ navigation, route }: Props) => {
    const [properties, setProperties] = useState<PropertiesProps | null>(null);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(50);
  
    const chargeProperties = async () => {
      try {
        const result = await fetch(PROPERTIES_ENDPOINT, {
          method: "POST",
          headers: {
            Authentication: `Bearer ${route.params.token}`,
          },
          body: JSON.stringify({
            page: page,
            per_page: size,
          }),
        });
  
        if (result.status === 200) {
          const value = result.json();
          const newValue = Object.keys(value).map((e) => {
            if (value[e].length > 0) {
              return {
                title: e.charAt(0).toUpperCase(),
                properties: value[e],
              };
            }
          })
          setProperties(newValue);
        } else {
          Alert.alert('ERROR', '', [
            {
              text: 'Cerrar',
              style: 'cancel',
            },
          ]);
        }
      } catch (error) {
        Alert.alert('ERROR', '', [
            {
              text: 'Cerrar',
              style: 'cancel',
            },
        ]);
      }
    };
  
    useEffect(() => {
      chargeProperties();
    }, [page, size]);
  
    if (!properties) {
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>;
    } else {
      return (
        <View
          style={{
            flex: 1,
            display: "flex",
            padding: 20,
          }}
        >
          <ScrollView style={{ flex: 1, width: "100%" }}>
            {properties && properties.length > 0 && properties
              .sort(
                (a: any, b: any) =>
                  a.title.toLowerCase().charCodeAt(0) -
                  b.title.toLowerCase().charCodeAt(0)
              )
              .map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      setProperties((prevState) => prevState.splice(index, 1))
                    }
                  >
                    <View style={{ padding: 5 }}>
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        {item.title}
                      </Text>
                      {item.properties.sort().map((p: string, i: number) => (
                        <Text
                          key={i}
                          style={{ fontSize: 12, fontWeight: "400", padding: 10 }}
                        >
                          {p}
                        </Text>
                      ))}
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
          <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Button
              onPress={() => setPage((prevState) => prevState - 1)}
              disabled={page === 1}
              title="Anterior"
              color="#009066"
            />
            <Button
              onPress={() => setPage((prevState) => prevState + 1)}
              title="Siguiente"
              color="#009066"
            />
          </View>
        </View>
      );
    }
  }  

export default Home
