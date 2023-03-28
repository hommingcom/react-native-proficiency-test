import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { getProperties } from '../utils/services';
import { Property } from '../utils/interfaces';
import { processProperties} from '../utils/helpers';


const HomeScreen: React.FC = () => {
  const [properties, setProperties] = useState<(string | Property)[]>([]);
  const { token } = useAuth();

  //I use the useEffect to fetch properties allways when the token change, which will be when an user logs in the app
  useEffect(() => {
    //And I need first to check if there is a token at all, if it pass, it fetches the data with getProperties service
    if (token) {
      getProperties(token).then((data) => {
        if (data) {
          // I process the fetched data to group it by the initial letter and group them under this initial letter without accent
          const processedData = processProperties(data.data);
          // Update to the properties with this processedData
          setProperties(processedData);
        }
      });
    }
  }, [token]);

  const handlePress = (index: number) => {
    setProperties((prevProperties) => {
      const newProperties = [...prevProperties];
      newProperties.splice(index, 1);
  
      /* Check if the previous item is a section header and there are no more properties under it
      If both conditions are true, the header will be removed */
      if (index > 0 && typeof newProperties[index - 1] === 'string') {
        const nextItem = newProperties[index];
        if (!nextItem || typeof nextItem === 'string') {
          newProperties.splice(index - 1, 1);
        }
      }
  
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