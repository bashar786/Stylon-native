import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ClockIcon from '../../../../assets/images/clock.svg'
import UserIcon from '../../../../assets/images/user.svg'
import TimeIcon from '../../../../assets/images/time.svg'

const AppointmentCard = ({ name, time, barber, duration }) => {
  const [status, setStatus] = useState('Pending');

  const handleStatusChange = () => {
    if (status === 'Pending') {
      setStatus('Completed');
    }
  };

  return (
    <View style={styles.card}>
      {/* Green completed icon only if status is completed */}
      {status === 'Completed' && (
        <View style={styles.completedIcon}>
          <MaterialIcons name="check-circle" size={24} color="white" />
        </View>
      )}

      <Text style={styles.name}>{name}</Text>

      <View style={styles.row}>
      <ClockIcon />
        <Text style={styles.detailText}>{time}</Text>
      </View>

      <View style={styles.row}>
       <UserIcon />
        <Text style={styles.detailText}>{barber}</Text>
      </View>

      <View style={styles.row}>
        <TimeIcon />
        <Text style={styles.detailText}>{duration}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, status === 'Completed' && styles.disabledButton]}
        onPress={handleStatusChange}
        disabled={status === 'Completed'}
      >
        <Text style={styles.buttonText}>
          {status === 'Pending' ? 'COMPLETE' : 'COMPLETED'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.heading}>
        Appointments Requests
        </Text>
        <Text style={styles.seeAll}>  See all</Text>
        </View>
   
  
        {/* Horizontal ScrollView for multiple appointment cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
          <AppointmentCard
            name="Mudassir Ali"
            time="Today, 10:00 AM"
            barber="Hamza, Sr Barber"
            duration="1:30 Hour"
          />
          <AppointmentCard
            name="Ali Hamza"
            time="Today, 10:00 AM"
            barber="Raza, Sr Barber"
            duration="1:30 Hour"
          />
          <AppointmentCard
            name="Bilal Zafar"
            time="Today, 11:30 AM"
            barber="Asim, Jr Barber"
            duration="1 Hour"
          />
          <AppointmentCard
            name="Usman Tariq"
            time="Today, 1:00 PM"
            barber="Noman, Sr Barber"
            duration="1:15 Hour"
          />
          {/* Add more AppointmentCard components here */}
        </ScrollView>
      </ScrollView>
    );
  }
  

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: "SemiBold"
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: "SemiBold",
    color: '#737373',
  },
  seeAll: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "SemiBold",
    color: '#FE4E00',
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 16
  },
  card: {
    width: 220,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    borderColor: '#ccc',
    borderWidth: 0.5,
    position: 'relative'
  },
  completedIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#00cc00',
    borderRadius: 20,
    padding: 2
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: "Medium"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    fontFamily: "Regular"
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontFamily: "Regular"
  },
  button: {
    marginTop: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#00C52E',
    borderRadius: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: '#00C52E',
    fontWeight: 'bold',
    fontSize: 'Medium'
  },
  disabledButton: {
    opacity: 0.6
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 16, // optional padding for spacing
  },
  
});
