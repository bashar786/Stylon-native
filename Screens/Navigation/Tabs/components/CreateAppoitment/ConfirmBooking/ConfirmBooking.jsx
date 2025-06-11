import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ConfirmBookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedCustomer, selectedServices, specialist, totalPrice, totalDuration } = route.params;

  const appointmentDate = new Date().toLocaleDateString();
  const appointmentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  console.log('ConfirmBookingScreen Params:', selectedCustomer);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.card}>
        {/* Customer Info */}
        <View style={{display: 'flex', alignItems: 'center',  marginBottom: 20, flexDirection: 'row',}}>
        <Image
          source={selectedCustomer?.image ? { uri: selectedCustomer.image } : require('../../../../../../assets/images/default-img.png')}
          style={styles.customerImage}
        />
        <View>
        <Text style={styles.customerName}>{selectedCustomer?.name} </Text>

<Text style={styles.customerGender}>{selectedCustomer?.gender}</Text>
        </View>
        
        </View>
        {/* Services List */}
        <View style={styles.section}>
          {selectedServices.map((service, index) => (
            <View key={index} style={styles.serviceRow}>
            <AntDesign name="check" size={20} color="#FF5722" />              
            <Text style={styles.serviceText}>{service.title}</Text>
              <Text style={styles.serviceDuration}>{service.duration}</Text>
            </View>
          ))}
        </View>

        {/* Appointment Date & Time */}
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={24} color="#000" />
          <Text style={styles.infoText}>{appointmentDate} - {appointmentTime}</Text>
        </View>

        {/* Specialist */}
        <View style={styles.infoRow}>
          <Ionicons name="person-circle-outline" size={24} color="#000" />
          <Text style={styles.infoText}>{specialist.name} <Text style={{color: '#444'}}>( {specialist.role} )</Text></Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Total Duration and Price */}
        <View style={styles.totalRow}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10,justifyContent: 'space-between', marginBottom: 15}}>
            <Text style={styles.label}>Total Duration</Text>
            <View style={styles.row}>
            <MaterialCommunityIcons name="timer-sand-complete" size={24} color="black" />
             <Text style={styles.value}>{totalDuration} min</Text>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10,justifyContent: 'space-between'}}>
            <Text style={[styles.label,{color: '#000', fontSize: 20, fontFamily: 'Bold'}]}>Total</Text>
            <Text style={[styles.value, {color: '#000', fontSize: 20, fontFamily: 'Bold'}]}>${totalPrice}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Book Now Button */}
      <TouchableOpacity onPress={()=> navigation.navigate('SuccessfullyBookedScreen')} style={styles.bookButton}>
        <Text style={styles.bookButtonText}>BOOK NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#7d7d7d',
    marginTop: 50,
  },
  customerImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FF5722',
    padding: 4,
    marginRight: 10
  },
  customerName: {
    fontFamily: 'SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  customerGender: {
    fontFamily: 'Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    padding: 0,
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
  label: {
    fontFamily: 'Medium',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
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
  bookButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FF402D',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontFamily: 'SemiBold',
    fontSize: 16,
  },
});
