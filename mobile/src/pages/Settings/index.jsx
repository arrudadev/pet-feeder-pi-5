import React, { useEffect, useState } from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { api } from '../../services/api';

import { Loader } from '../../components/Loader';

import styles from './styles';

export const Settings = () => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [isEdit, setIsEdit] = useState(false);
  const [editScheduleID, setEditScheduleID] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {    
    try {      
      async function fetchSchedules() {        
        const response = await api.get('schedules');        
  
        setSchedules(response.data.schedules);
        setLoading(false);
      }

      fetchSchedules();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  function handleEditSchedule(schedule) {
    setCurrentDate(new Date(schedule.schedule_hour));
    setIsEdit(true);
    setEditScheduleID(schedule.schedule_id);
    showTimePicker();
  }

  function handleDeleteHour(index) {
    // const newTimes = [...times];

    // newTimes.splice(index, 1);

    // setTimes(newTimes);
  }

  async function handleTimePickerConfirm(date) {
    try {
      setLoading(true);
  
      if (isEdit) {
        await api.put('schedules', {
          schedule_hour: date,
          schedule_id: editScheduleID
        });
  
        const newSchedules = schedules.map(schedule => {
          if (schedule.schedule_id === editScheduleID) {
            schedule.schedule_hour = date;
          }
  
          return schedule;
        });
  
        setIsEdit(false);
        setEditScheduleID(-1);
        setSchedules(newSchedules);
      } else {
        
        await api.post('schedules', {
          schedule_hour: date
        });
  
        // setTimes([...times, date]);
      }
  
      hideTimePicker();
  
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loader isLoading={loading} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Horários</Text>
          
          <TouchableOpacity style={styles.addNewHour} onPress={handleAddNewHour}>
            <Text style={styles.addNewHourText}>Adicionar novo Horário</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerHours}>
          {schedules.length === 0 && (
            <Text style={styles.noDataFoundText}>
              Nenhum horário cadastrado                      
            </Text>
          )}

          {schedules.length > 0 && schedules.map(schedule => (
            <View key={schedule.schedule_id} style={styles.hour}>
              <Text style={styles.hourText}>
                {format(new Date(schedule.schedule_hour), 'HH:mm', {
                  locale: ptBR,
                })}                        
              </Text>

              <View style={styles.hourIcons}>
                <Ionicons 
                  name={'pencil-outline'} 
                  size={40} 
                  color="black" 
                  style={styles.icon} 
                  onPress={() => handleEditSchedule(schedule)} 
                />
                <Ionicons 
                  name={'trash-outline'} 
                  size={40} 
                  color="black" 
                  style={styles.icon} 
                  onPress={() => handleDeleteHour(schedule.schedule_id)} 
                />
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
    </>
  );
}