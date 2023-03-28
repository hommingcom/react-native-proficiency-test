import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Button, Text, ScrollView, TouchableOpacity, View, ActivityIndicator, Alert, SectionList } from 'react-native/types'
import { PROPERTIES_ENDPOINT } from '../utils/endpoints';

type RootStackParamList = {
  Login: undefined;
  Home: { token: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

type Property = {
  id: number;
  owner_id: number;
  team_id: number | null;
  crm_id: number | null;
  type: string;
  name: string;
  address: string | null;
  address_details: string | null;
  address_fields: string | null;
  latitude: number | null;
  longitude: number | null;
  bathrooms_count: number | null;
  rooms_count: number | null;
  room_management: boolean;
  reference: string | null;
  register_number: string | null;
  last_alteration: string | null;
  last_check_in: string | null;
  fee_amount: number | null;
  fee_percentage: number | null;
  purchase_price: number | null;
  refurbishment_price: number | null;
  taxes: number | null;
  register_valuation: number | null;
  management_fee: number | null;
  notary: number | null;
  management: number | null;
  current_valuation: number | null;
  state_valuation: number | null;
  cadastral_valuation: number | null;
  rental_price_index: number | null;
  constructed_area: string;
  usable_area: string | null;
  extras: string | null;
  comments: string | null;
  cleaning_expense: number | null;
  created_at: string;
  updated_at: string;
  common_area: string | null;
  active_contract_tenants_count: number;
  occupied_rooms_count: number;
  collections: string[];
  media: any[];
  tags: any[];
}


const Home = ({ navigation, route }: Props) => {
  const [properties, setProperties] = useState([]);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(50);

  const [loading, setLoading] = useState(true);

  const [nextPage, setNextPage] = useState(true);

  const parseString = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const chargeProperties = async () => {
    try {
      const result = await fetch(
        `${PROPERTIES_ENDPOINT}?page=${page}&per_page=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${route.params.token}`,
            "Content-type": "application/json",
          },
        }
      );

      if (result.status === 200) {
        const value = await result.json();
        setNextPage(value.next_page_url === null ? true : false);
        setProperties(
          value.data
            .filter((i: Property) => i.constructed_area !== undefined)
            .sort((a: Property, b: Property) =>
              parseString(a.name).localeCompare(parseString(b.name))
            )
            .map((i: Property) => {
              return {
                title: i.name[0].toUpperCase(),
                data: Object.entries(i),
                id: i.id,
              };
            })
        );
      } else {
        Alert.alert("ERROR", "", [
          {
            text: "Cerrar",
            style: "cancel",
          },
        ]);
      }
    } catch (error) {
      Alert.alert("ERROR", "", [
        {
          text: "Cerrar",
          style: "cancel",
        },
      ]);
    }
  };

  useEffect(() => {
    chargeProperties().then(() => setLoading(false));
  }, [page, size]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          padding: 20,
          paddingTop: 0,
        }}
      >
        <SectionList
          sections={properties}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            if (
              (item[1] && !Array.isArray(item[1])) ||
              (item[1] && Array.isArray(item[1]) && item[1].length)
            ) {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: 25,
                    paddingVertical: 5,
                  }}
                >
                  <Text style={{ fontWeight: "600" }}>- {item[0]}:</Text>
                  <Text style={{ paddingLeft: 5 }}>
                    {Array.isArray(item[1]) ? item[1].join(", ") : item[1]}
                  </Text>
                </View>
              );
            } else {
              return <></>
             }
          }}
          renderSectionHeader={({ section: { title, id } }) => (
            <TouchableOpacity
              onPress={() =>
                setProperties((prevState) =>
                  prevState.filter((i) => i.id !== id)
                )
              }
            >
              <Text
                style={{ paddingTop: 15, fontWeight: "bold", fontSize: 20 }}
              >
                * {title}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <Button
            onPress={() => setPage((prevState) => prevState - 1)}
            disabled={page === 1}
            title="Anterior"
            color="#009066"
          />
          <Button
            disabled={nextPage}
            onPress={() => setPage((prevState) => prevState + 1)}
            title="Siguiente"
            color="#009066"
          />
        </View>
      </View>
    );
  }
};

export default Home;
