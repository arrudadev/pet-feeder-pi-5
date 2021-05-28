import React, { useEffect, useState } from 'react';

import { FlatList, Text, View, TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Feed } from '../../components/Feed';

import { api } from '../../services/api';

import styles from './styles';

export const Feeds = () => {
  const [feeds, setFeeds] = useState([]);  

  async function fetchFeeds() {
    try {
      const response = await api.get('feeds');

      setFeeds(response.data.feeds);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PetFeeder</Text>

        <TouchableOpacity onPress={fetchFeeds}>
        <Ionicons name={'refresh-outline'} size={48} color={'green'} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.listFeeds}>Todas Alimentações</Text>

        <FlatList
          data={feeds}
          keyExtractor={feed => String(feed.feed_id)}
          renderItem={({ item: feed }) => (
            <View key={feed.feed_id} style={styles.containerFeed}>
              <Feed 
                date={format(new Date(feed.feed_date), 'dd/MM/yyyy', {
                  locale: ptBR,
                })} 
                hour={format(new Date(feed.feed_hour), 'HH:mm', {
                  locale: ptBR,
                })} 
                weight={feed.feed_weight}
              />
            </View>
          )}
        />
      </View>      
    </View>
  )   
}