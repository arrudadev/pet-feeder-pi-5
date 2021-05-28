  
import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export const Feed = ({ date, hour, weight }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Horário:</Text>
        <Text style={styles.value}>{hour}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Peso da ração:</Text>
        <Text style={styles.value}>{weight} Gramas</Text>
      </View>
    </View>
  );
};
