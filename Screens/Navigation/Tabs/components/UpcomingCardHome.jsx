import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ClockIcon from '../../../../assets/images/clock.svg';
import UserIcon from '../../../../assets/images/user.svg';
import TimeIcon from '../../../../assets/images/time.svg';
import { useNavigation } from 'expo-router';

const mockAppointments = [
  {
    id: 101,
    status: 'Pending',
    date: "2025-06-11",
    time: "10:00 AM",
    customerName: "John Doe",
    specialistName: "Dr. Sarah Lee",
    specialistRole: "Barber",
    specialistImage: "https://randomuser.me/api/portraits/women/2.jpg",
    orderNumber: "A001",
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
    specialistRole: "Owner",
    specialistName: "Dr. Mike Ross",
    specialistImage: "https://randomuser.me/api/portraits/women/5.jpg",
    orderNumber: "A002",
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
    specialistRole: "Manager",
    specialistName: "Dr. Lisa Ray",
    specialistImage: "https://randomuser.me/api/portraits/men/5.jpg",
    orderNumber: "A003",
    services: [
      { name: "Manicure", time: "25 mins", price: "$15" },
    ],
  },
];

const AppointmentCard = ({ id, name, time, barber, duration, status, onComplete }) => {
  const handleStatusChange = () => {
    if (status === 'Pending') {
      Alert.alert(
        'Confirm Completion',
        'Are you sure you want to mark this appointment as completed?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => onComplete(id),
          },
        ],
        { cancelable: true }
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
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAppointments = async () => {
      setAppointments(mockAppointments); // Simulated fetch
    };

    fetchAppointments();
  }, []);

  const markAsCompleted = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: 'Completed' } : appt
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.heading}>Upcoming Appointments</Text>
        <Text style={styles.subheading}>(12 Left)</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
        {appointments.filter(item => item.status !== 'Completed').length > 0 ? (
          appointments
            .filter(item => item.status !== 'Completed')
            .map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("AppointmentHistoryDetail", { appointment: item })
                }
                activeOpacity={0.8}
              >
                <AppointmentCard
                  id={item.id}
                  name={item.customerName}
                  time={`${item.date} ${item.time}`}
                  barber={item.specialistName}
                  duration={item.time}
                  status={item.status}
                  onComplete={markAsCompleted}
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
    fontFamily: "SemiBold",
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#737373',
    marginBottom: 16,
    marginLeft: -30,
    fontFamily: "SemiBold",
  },
  seeAll: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FE4E00',
    marginBottom: 16,
    fontFamily: "SemiBold",
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
    position: 'relative',
  },
  completedIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#00cc00',
    borderRadius: 20,
    padding: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: "Medium",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontFamily: "Regular",
  },
  button: {
    marginTop: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#00C52E',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#00C52E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  disabledButton: {
    opacity: 0.6,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    paddingVertical: 20,
    fontFamily: 'Regular',
  },
});
