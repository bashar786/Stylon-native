import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppointmentHistory from './widgets/AppointmentHistory';

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
  // Add more mock appointments if needed
];

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleApprove = (appointmentId) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    alert(`Appointment ${appointmentId} marked as approved`);
  };

  const handleReject = (appointmentId) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    alert(`Appointment ${appointmentId} rejected`);
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
          <AppointmentHistory
            key={item.id}
            userImage={item.userImage}
            userName={item.userName}
            services={item.services}
            appointmentDate={item.appointmentDate}
            barberName={item.barberName}
            onComplete={() => handleApprove(item.id)}
            onCancel={() => handleReject(item.id)}
          />
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
