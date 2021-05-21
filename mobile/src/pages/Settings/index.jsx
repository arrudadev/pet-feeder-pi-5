import React, { useState } from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './styles';

export const Settings = () => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [times, setTimes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  function showTimePicker() {
    setTimePickerVisibility(true);
  };

  function hideTimePicker() {
    setTimePickerVisibility(false);
  };  

  function handleAddNewHour() {
    if (times.length < 3) {
      setCurrentDate(new Date());
      showTimePicker();
    }
  }

  function handleEditHour(time, index) {
    setCurrentDate(new Date(time));
    setIsEdit(true);
    setEditIndex(index);
    showTimePicker();
  }

  function handleDeleteHour(index) {
    const newTimes = [...times];

    newTimes.splice(index, 1);

    setTimes(newTimes);
  }

  function handleTimePickerConfirm(date) {
    if (isEdit) {
      const newTimes = times.map((time, index) => {
        if (index === editIndex) {
          time = date;
        }

        return time;
      });

      setIsEdit(false);
      setEditIndex(-1);
      setTimes(newTimes);
    } else {
      setTimes([...times, date]);
    }

    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Horários</Text>
        
        <TouchableOpacity style={styles.addNewHour} onPress={handleAddNewHour}>
          <Text style={styles.addNewHourText}>Adicionar novo Horário</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerHours}>
        {times.length === 0 && (
          <Text style={styles.noDataFoundText}>
            Nenhum horário cadastrado                      
          </Text>
        )}

        {times.length > 0 && times.map((time, index) => (
          <View key={Math.random() * index + 1} style={styles.hour}>
            <Text style={styles.hourText}>
              {format(time, 'HH:mm', {
                locale: ptBR,
              })}                        
            </Text>

            <View style={styles.hourIcons}>
              <Ionicons name={'pencil-outline'} size={40} color="black" style={styles.icon} onPress={() => handleEditHour(time, index)} />
              <Ionicons name={'trash-outline'} size={40} color="black" style={styles.icon} onPress={() => handleDeleteHour(index)} />
            </View>
          </View>
        ))}
      </View>
      
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        date={currentDate}
        onConfirm={handleTimePickerConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  )   
}