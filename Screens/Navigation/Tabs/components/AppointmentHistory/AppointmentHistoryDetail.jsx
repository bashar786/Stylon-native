import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

const AppointmentHistoryDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { appointment } = route.params;
  console.log('Appointment:', appointment);
  const totalDuration = appointment.services.reduce((sum, service) => {
    // Extract number from "30 mins", "1 hr", etc.
    if (service.time.includes('hr')) {
      const hours = parseFloat(service.time);
      return sum + hours * 60;
    } else {
      const minutes = parseFloat(service.time);
      return sum + minutes;
    }
  }, 0);
  
  const totalPrice = appointment.services.reduce((sum, service) => {
    const price = parseFloat(service.price.replace('$', ''));
    return sum + price;
  }, 0);
  
  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment Detail</Text>
        <TouchableOpacity onPress={() => setFilterModalOpen(true)}>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.card}>
        {/* Customer Info */}
        <View style={{ display: 'flex', alignItems: 'center', marginBottom: 20, flexDirection: 'row' }}>
          <Image
            source={appointment.customer?.image ? { uri: appointment.customer.image } : require('../../../../../assets/images/default-img.png')}
            style={styles.customerImage}
          />
          <View>
          <Text style={styles.customerName}>{appointment.customerName}</Text>
          <Text style={styles.customerGender}>{appointment.customer?.gender}</Text>
          </View>
        </View>

        {/* Services List */}
        <View style={styles.section}>
          {appointment.services.map((service, index) => (
            <View key={index} style={styles.serviceRow}>
              <AntDesign name="check" size={20} color="#FF5722" />
              <Text style={styles.serviceText}>{service.name}</Text>
              <Text style={styles.serviceDuration}>{service.time}</Text>
            </View>
          ))}
        </View>

        {/* Appointment Date & Time */}
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={24} color="#000" />
          <Text style={styles.infoText}>{appointment.date} - {appointment.time}</Text>
        </View>

        {/* Specialist */}
        <View style={styles.infoRow}>
          <Ionicons name="person-circle-outline" size={24} color="#000" />
          <Text style={styles.infoText}>
            {appointment.specialistName} <Text style={{ color: '#444' }}>( {appointment.specialistRole} )</Text>
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Total Duration and Price */}
        <View style={styles.totalRow}>
  <View style={styles.totalItem}>
    <Text style={styles.label}>Total Duration</Text>
    <View style={styles.row}>
      <MaterialCommunityIcons name="timer-sand-complete" size={24} color="black" />
      <Text style={styles.value}>{totalDuration} min</Text>
    </View>
  </View>
  <View style={styles.totalItem}>
    <Text style={[styles.label, { color: '#000', fontSize: 20, fontFamily: 'Bold' }]}>Total</Text>
    <Text style={[styles.value, { color: '#000', fontSize: 20, fontFamily: 'Bold' }]}>${totalPrice.toFixed(2)}</Text>
  </View>
</View>

      </ScrollView>
    </View>
  );
};

export default AppointmentHistoryDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#7d7d7d',
    marginTop: 20,
  },
  customerImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  customerName: {
    fontFamily: 'SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 35,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "SemiBold",
  },
  customerGender: {
    fontFamily: 'Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  serviceText: {
    flex: 1,
    fontFamily: 'SemiBold',
    fontSize: 16,
    color: '#000',
  },
  serviceDuration: {
    fontFamily: 'Regular',
    fontSize: 14,
    color: '#555',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  infoText: {
    fontFamily: 'Regular',
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  totalRow: {
    justifyContent: 'space-between',
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Medium',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontFamily: 'SemiBold',
    fontSize: 16,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
