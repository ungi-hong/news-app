import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native'
import { ListItem } from '../components/ListItem'
import axios from 'axios'
import { NEWS_API_KEY } from '@env'

export const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([])
  const newsApiKey = NEWS_API_KEY
  const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${newsApiKey}`

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL)
      setArticles(response.data.articles)
      console.log('success')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() =>
              navigation.navigate('Article', {
                article: item,
              })
            }
          />
        )}
        keyExtractor={(_item, index) => index.toString()}
      />
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
})
