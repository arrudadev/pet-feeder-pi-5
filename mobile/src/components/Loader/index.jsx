  
import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';

import styles from './styles';

export const Loader = ({ isLoading }) => {
  return (
    <Modal transparent animationType="none" visible={isLoading}>
      <View style={styles.modalBackground}>
        <ActivityIndicator animating={isLoading} size="large" color="#00b803" />
      </View>
    </Modal>
  );
};
