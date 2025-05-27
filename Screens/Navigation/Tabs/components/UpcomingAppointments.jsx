import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import UpcomingAppointment from './UpcomingAppointment';

// Mock data - Replace this with actual API call in the future
const mockAppointments = [
  {
    id: '1',
    userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    userName: 'Raza Hassan',
    services: [
      { name: 'Hair Styling', duration: '30 min' },
      { name: 'Hair Color', duration: '1 hour' },
    ],
    appointmentDate: '30-12-2023, 10AM',
    barberName: 'Raza, Sr Barber'
  },
  {
    id: '2',
    userImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    userName: 'Sarah Khan',
    services: [
      { name: 'Manicure', duration: '45 min' },
    ],
    appointmentDate: '31-12-2023, 2PM',
    barberName: 'Ali, Jr Barber'
  },
  // Add more mock appointments as needed
];

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This useEffect simulates fetching data from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // In production, replace this with actual API call
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // setAppointments(data);
        
        // Using mock data for now
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
    // Update local state immediately for better UX
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    
    // In production, also make API call to update backend
    // await markAppointmentComplete(appointmentId);
    alert(`Appointment ${appointmentId} marked as complete`);
  };

  const handleCancel = (appointmentId) => {
    // Update local state immediately for better UX
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    
    // In production, also make API call to update backend
    // await cancelAppointment(appointmentId);
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
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UpcomingAppointment
              userImage={item.userImage}
              userName={item.userName}
              services={item.services}
              appointmentDate={item.appointmentDate}
              barberName={item.barberName}
              onComplete={() => handleComplete(item.id)}
              onCancel={() => handleCancel(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.emptyText}>No upcoming appointments</Text>
      )}
    </View>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 20,
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