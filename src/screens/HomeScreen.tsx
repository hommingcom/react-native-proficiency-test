import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { getProperties } from '../utils/services';
import { Property } from '../utils/interfaces';


const HomeScreen: React.FC = () => {
  const [properties, setProperties] = useState<(string | Property)[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      getProperties(token).then((data) => {
        if (data) {
          const processedData = processProperties(data.data);
          setProperties(processedData);
        }
      });
    }
  }, [token]);

  const processProperties = (properties: Property[]): (string | Property)[] => {
    return properties
      .filter((property) => property.constructed_area !== undefined)
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce<(string | Property)[]>((acc, property) => {
        const initialLetter = property.name[0].toUpperCase();
        const prevItem = acc[acc.length - 1];

        if (!prevItem || (typeof prevItem === 'string' && prevItem !== initialLetter)) {
          acc.push(initialLetter);
        }

        acc.push(property);
        return acc;
      }, []);
  };

  const handlePress = (index: number) => {
    setProperties((prevProperties) => {
      const newProperties = [...prevProperties];
      newProperties.splice(index, 1);
      return newProperties;
    });
  };

  const renderItem: ListRenderItem<string | Property> = ({ item, index }) => {
    if (typeof item === 'string') {
      return <Text style={styles.header}>{item}</Text>;
    } else {
      return (
        <Text onPress={() => handlePress(index)} style={styles.propertyName}>
          {item.name}
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  propertyName: {
    fontSize: 18,
  },
});

export default HomeScreen;