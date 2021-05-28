import React, { useEffect, useState } from 'react';

import { Text, View, TouchableOpacity } from 'react-native';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Feed } from '../../components/Feed';

import { api } from '../../services/api';

import styles from './styles';

export const Home = () => {
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [weight, setWeight] = useState();

  async function handleGiveFoodNow() {
    try {
      await api.post('feeds', {
        feed_status: 'N'
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLastFeed() {
    try {
      const response = await api.get('feeds/last');

      const { feed } = response.data;

      setDate(format(new Date(feed.feed_date), 'dd/MM/yyyy', {
        locale: ptBR,
      }));

      setHour(format(new Date(feed.feed_hour), 'HH:mm', {
        locale: ptBR,
      }));

      setWeight(feed.feed_weight);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLastFeed();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PetFeeder</Text>                
      </View>

      <View style={styles.content}>
        <Text style={styles.lastFeed}>Ultima alimentação</Text>

        <Feed date={date} hour={hour} weight={weight} />

        <TouchableOpacity style={styles.updateLastFeed} onPress={fetchLastFeed}>
          <Text style={styles.updateLastFeedText}>Atualizar dados da ultima alimentação</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.giveFoodNowButton} onPress={handleGiveFoodNow}>
          <Text style={styles.giveFoodNowText}>Alimentar o Pet agora</Text>
        </TouchableOpacity>
      </View>      
    </View>
  )   
}