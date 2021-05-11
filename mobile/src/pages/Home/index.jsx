import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

export const Home = () => {
  function handleGiveFoodNow() {
    console.log('teste');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.giveFoodNowButton} onPress={handleGiveFoodNow}>
        <Text style={styles.giveFoodNowText}>Alimentar o Pet agora</Text>
      </TouchableOpacity>
    </View>
  )   
}