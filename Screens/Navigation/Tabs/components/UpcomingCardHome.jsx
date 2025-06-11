import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ClockIcon from '../../../../assets/images/clock.svg'
import UserIcon from '../../../../assets/images/user.svg'
import TimeIcon from '../../../../assets/images/time.svg'
import { useNavigation } from 'expo-router';

const mockAppointments = [
  
  {
    id: 101,
    date: "2025-06-11",
    time: "10:00 AM",
    customerName: "John Doe",
    specialistName: "Dr. Sarah Lee",
    specialistRole: "Barber",
    specialistImage: ("https://randomuser.me/api/portraits/women/2.jpg"),
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
    specialistImage: ("https://randomuser.me/api/portraits/women/5.jpg"),
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
    specialistImage: ("https://randomuser.me/api/portraits/men/5.jpg"),
    orderNumber: "A003",
    services: [
      { name: "Manicure", time: "25 mins", price: "$15" },
    ],
  },
];



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
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
         <Text style={styles.heading}>
          Upcoming Appointments
         
        </Text>
        <Text style={styles.subheading}>(12 Left)</Text>
        <Text style={styles.seeAll}>  See all</Text>
         </View>
  
        {/* Horizontal ScrollView for multiple appointment cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
        {appointments.length > 0 ? (
        appointments.map((item) => (
          <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate("AppointmentHistoryDetail", { appointment: item })
          }
          activeOpacity={0.8}
        >
            <AppointmentCard
            name={item.customerName}
            time={[ item.date, ' ',  item.time,]}
            barber={item.specialistName}
            duration={item.time}
          />
             </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>No upcoming appointments</Text>
      )}
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
    fontFamily: "SemiBold",
    flexDirection : 'row',
    justifyContent: 'space-between',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: "SemiBold",
    color: '#737373',
    fontSize: 16,
  },
  seeAll: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
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
    fontSize: 14,
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
