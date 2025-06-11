import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import UpcomingAppointment from './widgets/Calendar/UpcomingAppointmentCard';
import { useNavigation } from 'expo-router';

const mockAppointments = [
  
  {
    id: 101,
    date: "2025-06-11",
    time: "10:00 AM",
    customerName: "John Doe",
    specialistName: "Dr. Sarah Lee",
    specialistRole: "Barber",
    specialistImage: ("https://randomuser.me/api/portraits/women/7.jpg"),
    orderNumber: "A001",
    services: [
      { name: "Haircut", time: "30 mins", price: "$20" },
      { name: "Beard Trim", time: "15 mins", price: "$10" },
    ],
  },
  {
    id: 102,
    date: "2025-06-15",
    time: "2:30 PM",
    customerName: "Emma Watson",
    specialistRole: "Owner",
    specialistName: "Dr. Mike Ross",
    specialistImage: ("https://randomuser.me/api/portraits/women/9.jpg"),
    orderNumber: "A002",
    services: [
      { name: "Facial", time: "45 mins", price: "$40" },
      { name: "Massage", time: "1 hr", price: "$60" },
    ],
  },
  {
    id: 103,
    date: "2025-06-15",
    time: "4:00 PM",
    customerName: "Jake Paul",
    specialistRole: "Manager",
    specialistName: "Dr. Lisa Ray",
    specialistImage: ("https://randomuser.me/api/portraits/men/12.jpg"),
    orderNumber: "A003",
    services: [
      { name: "Manicure", time: "25 mins", price: "$15" },
    ],
  },
];

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Simulating fetch
        setAppointments(mockAppointments);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleComplete = (appointmentId) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    alert(`Appointment ${appointmentId} marked as complete`);
  };

  const handleCancel = (appointmentId) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    alert(`Appointment ${appointmentId} canceled`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading appointments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {appointments.length > 0 ? (
        appointments.map((item) => (
          <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate("AppointmentHistoryDetail", { appointment: item })
          }
          activeOpacity={0.8}
        >
          <UpcomingAppointment
            key={item.id}
            userImage={item.specialistImage}
            userName={item.customerName}
            services={item.services}
            appointmentDate={[ item.date,' ',' ', item.time]}
            barberName={item.specialistName}
            onComplete={() => handleComplete(item.id)}
            onCancel={() => handleCancel(item.id)}
          />
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>No upcoming appointments</Text>
      )}
    </View>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  container: {
   
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
