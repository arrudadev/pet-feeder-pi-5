import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';

import { api } from '../../services/api';

import styles from './styles';

export const Home = () => {
  async function handleGiveFoodNow() {
    try {
      const response = await api.put('feed');

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.giveFoodNowButton} onPress={handleGiveFoodNow}>
        <Text style={styles.giveFoodNowText}>Alimentar o Pet agora</Text>
      </TouchableOpacity>
    </View>
  )   
}