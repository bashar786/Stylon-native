import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import PendingAppointments from './widgets/Calendar/PendingAppointmentCard';
import { useNavigation } from 'expo-router';

const mockAppointments = [
  {
    id: 101,
    date: "2025-06-11",
    time: "10:00 AM",
    customerName: "John Doe",
    specialistName: "Dr. Sarah Lee",
    specialistRole: "Barber",
    specialistImage: "https://randomuser.me/api/portraits/women/7.jpg",
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
    specialistImage: "https://randomuser.me/api/portraits/women/9.jpg",
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
    specialistImage: "https://randomuser.me/api/portraits/men/12.jpg",
    orderNumber: "A003",
    services: [
      { name: "Manicure", time: "25 mins", price: "$15" },
    ],
  },
  {
    id: 104,
    date: "2025-06-18",
    time: "1:00 PM",
    customerName: "Alex Johnson",
    specialistRole: "Barber",
    specialistName: "Dr. Blake James",
    specialistImage: "https://randomuser.me/api/portraits/men/14.jpg",
    orderNumber: "A004",
    services: [
      { name: "Pedicure", time: "30 mins", price: "$25" },
    ],
  },
  {
    id: 105,
    date: "2025-06-20",
    time: "11:30 AM",
    customerName: "Samantha Green",
    specialistRole: "Therapist",
    specialistName: "Dr. Mia Stone",
    specialistImage: "https://randomuser.me/api/portraits/women/8.jpg",
    orderNumber: "A005",
    services: [
      { name: "Therapy Session", time: "1 hr", price: "$70" },
    ],
  },
  {
    id: 106,
    date: "2025-06-22",
    time: "9:00 AM",
    customerName: "Chris Evans",
    specialistRole: "Owner",
    specialistName: "Dr. Zoe Khan",
    specialistImage: "https://randomuser.me/api/portraits/women/11.jpg",
    orderNumber: "A006",
    services: [
      { name: "Consultation", time: "30 mins", price: "$30" },
    ],
  },
  // Add more if needed...
];

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
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

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF5722" />
        <Text>Loading appointments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  const visibleAppointments = appointments.slice(0, visibleCount);

  return (
    <View style={styles.container}>
      {visibleAppointments.length > 0 ? (
        visibleAppointments.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate("AppointmentHistoryDetail", { appointment: item })
            }
            activeOpacity={0.8}
          >
            <PendingAppointments
              userImage={item.specialistImage}
              userName={item.customerName}
              services={item.services}
              appointmentDate={[item.date, ' ', item.time]}
              barberName={item.specialistName}
              onComplete={() => handleComplete(item.id)}
              onCancel={() => handleCancel(item.id)}
            />
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>No upcoming appointments</Text>
      )}

      {visibleCount < appointments.length && (
        <TouchableOpacity style={styles.loadMoreBtn} onPress={handleLoadMore}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}

      {visibleCount >= appointments.length && appointments.length > 3 && (
        <Text style={styles.noMoreText}>No more appointments</Text>
      )}
    </View>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  loadMoreBtn: {
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'SemiBold',
  },
  noMoreText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#999',
    fontSize: 14,
    fontFamily: 'Regular',
  },
});
