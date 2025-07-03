import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ClockIcon from '../../../../../assets/images/clock.svg';
import UserIcon from '../../../../../assets/images/user.svg';
import TimeIcon from '../../../../../assets/images/time.svg';
import { useNavigation } from 'expo-router';

const mockAppointments = [
  {
    id: 101,
    status: 'Pending',
    date: "2025-06-11",
    time: "10:00 AM",
    customerName: "John Doe",
    specialistName: "Dr. Sarah Lee",
    services: [
      { name: "Haircut", time: "30 mins", price: "$20" },
      { name: "Beard Trim", time: "15 mins", price: "$10" },
    ],
  },
  {
    id: 102,
    status: 'Pending',
    date: "2025-06-15",
    time: "2:30 PM",
    customerName: "Emma Watson",
    specialistName: "Dr. Mike Ross",
    services: [
      { name: "Facial", time: "45 mins", price: "$40" },
      { name: "Massage", time: "1 hr", price: "$60" },
    ],
  },
  {
    id: 103,
    status: 'Pending',
    date: "2025-06-15",
    time: "4:00 PM",
    customerName: "Jake Paul",
    specialistName: "Dr. Lisa Ray",
    services: [
      { name: "Manicure", time: "25 mins", price: "$15" },
    ],
  },
];

const AppointmentCard = ({ id, name, time, barber, duration, status, onApprove, onDecline }) => {
  const handleApprove = () => {
    if (status === 'Pending') {
      Alert.alert(
        'Approve Appointment',
        'Are you sure you want to approve this appointment?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => onApprove(id) }
        ]
      );
    }
  };

  const handleDecline = () => {
    if (status === 'Pending') {
      Alert.alert(
        'Decline Appointment',
        'Are you sure you want to decline this appointment?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => onDecline(id) }
        ]
      );
    }
  };

  return (
    <View style={styles.card}>
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

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, status !== 'Pending' && styles.disabledButton]}
          onPress={handleApprove}
          disabled={status !== 'Pending'}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.declineButton, status !== 'Pending' && styles.disabledButton]}
          onPress={handleDecline}
          disabled={status !== 'Pending'}
        >
          <Text style={[styles.buttonText, { color: '#FF3B30' }]}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setAppointments(mockAppointments);
  }, []);

  const markAsCompleted = (id) => {
    setAppointments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'Completed' } : item
      )
    );
  };

  const markAsDeclined = (id) => {
    setAppointments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'Declined' } : item
      )
    );
  };

  const visibleAppointments = appointments.filter(
    item => item.status === 'Pending'
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.heading}>Appointments Requests</Text>
        <Text style={styles.seeAll}> See all </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
        {visibleAppointments.length > 0 ? (
          visibleAppointments.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("AppointmentHistoryDetail", { appointment: item })}
              activeOpacity={0.8}
            >
              <AppointmentCard
                id={item.id}
                name={item.customerName}
                time={`${item.date} ${item.time}`}
                barber={item.specialistName}
                duration={item.time}
                status={item.status}
                onApprove={markAsCompleted}
                onDecline={markAsDeclined}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No upcoming appointments</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: "SemiBold"
  },
  seeAll: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "SemiBold",
    color: '#FE4E00',
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 16,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#00C52E',
    borderRadius: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#00C52E'
  },
  declineButton: {
    borderColor: '#FF3B30',
  },
  disabledButton: {
    opacity: 0.5
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontFamily: "Regular",
    marginTop: 20
  }
});
