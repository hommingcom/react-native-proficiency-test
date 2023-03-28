import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PROPERTIES_ENDPOINT } from '../utils/endpoints'
import { PropertiesReq } from '../utils/interfaces'

interface iProperty {
  title: string
  data: any[]
}

const Home = ({ route, navigation }: { route: any; navigation: any }) => {
  const [data, setData] = useState<iProperty[]>([])
  const token = route.params.token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestParams: PropertiesReq = {
          page: 1,
          per_page: 10,
        }
        const requestParamsString = {
          page: requestParams.page.toString(),
          per_page: requestParams.per_page.toString(),
        }
        const response = await fetch(
          `${PROPERTIES_ENDPOINT}?${new URLSearchParams(requestParamsString)}`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos')
        }
        const responseData = await response.json()
        console.log(responseData)
        const properties = responseData?.data
        const sortedProperties = properties
          .filter(
            (property: { constructed_area: number }) =>
              property.constructed_area,
          )
          .sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name),
          )
        const sectionData = sortedProperties.reduce(
          (acc: { title: any; data: any[] }[], property: { name: string }) => {
            const firstLetter = property.name.charAt(0).toUpperCase()
            const sectionIndex = acc.findIndex(
              section => section.title === firstLetter,
            )
            if (sectionIndex === -1) {
              acc.push({
                title: firstLetter,
                data: [property],
              })
            } else {
              acc[sectionIndex].data.push(property)
            }
            return acc
          },
          [],
        )
        setData(sectionData)
      } catch {
        setData([])
      }
    }

    fetchData()
  }, [token])

  const renderNameProperty = ({
    item,
    section,
  }: {
    item: any
    section: any
  }) => {
    const handlePress = () => {
      const newData = data
        .map(s => {
          if (s.title === section.title && s.data.length === 1) {
            return null
          }
          const newSectionData = s.data.filter(
            (property: { id: any }) => property.id !== item.id,
          )
          return { ...s, data: newSectionData }
        })
        .filter(s => s != null)
      setData(newData.filter(item => item !== null) as iProperty[])
    }

    return (
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text style={styles.textProperty}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderSectionHeader = ({ section }: { section: any }) => (
    <View>
      <Text style={styles.sectionTitle}>* {section.title}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SectionList
          sections={data}
          renderItem={renderNameProperty}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    color: '#58b78f',
    fontSize: 32,
  },
  textProperty: {
    color: 'black',
    fontSize: 22,
  },
})
