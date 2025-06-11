import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ServicesContainer from './Services'; // Import the component

const servicesData = {
  Massage: [],
  Wax: [],
  Makeup: [
    { id: 1, title: 'Eye Lash (Only)', duration: '30 Min', price: 500 },
    { id: 2, title: 'Eye Makeup', duration: '20 Min', price: 3500 },
    { id: 3, title: 'Eye Random', duration: '20 Min', price: 4500 },
    { id: 4, title: 'Eye Makeup', duration: '20 Min', price: 5500 },
    { id: 5, title: 'Eye Makeup', duration: '20 Min', price: 7500 },
    { id: 6, title: 'Eye Makeup', duration: '20 Min', price: 8500 },
    { id: 7, title: 'Eye Makeup', duration: '20 Min', price: 9500 },
    { id: 8, title: 'Eye Makeup', duration: '20 Min', price: 500 },
    { id: 9, title: 'Eye Makeup', duration: '20 Min', price: 500 },
    { id: 10, title: 'Eye Makeup', duration: '20 Min', price: 500 },
    { id: 11, title: 'Eye Makeup', duration: '20 Min', price: 500 },

  ],
};

export default function AppointmentScreen({ route,navigation }) {
  const { specialist, date, time } = route.params;
  const [activeCategory, setActiveCategory] = useState('Makeup');
  const [selectedServices, setSelectedServices] = useState([]);

  const getTotalDuration = () => {
    return selectedServices.reduce((acc, item) => {
      const durationInMinutes = parseInt(item.duration); // extract the number from "30 Min"
      return acc + (isNaN(durationInMinutes) ? 0 : durationInMinutes);
    }, 0);
  };
  
  const toggleService = (service) => {
    if (selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const totalPrice = selectedServices.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}   showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Appointment</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Packages</Text>
          </TouchableOpacity>
        </View>

        {/* Services Container */}
        <ServicesContainer
          servicesData={servicesData}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedServices={selectedServices}
          toggleService={toggleService}
        />
      </ScrollView>

      {/* Bottom Total */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          {selectedServices.map((item) => (
            <View key={item.id} style={styles.totalRow}>
              <Text style={styles.totalLabel}>{item.title}</Text>
              <View style={styles.divider} />
              <Text style={styles.totalValue}>{item.price} $</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { fontFamily: 'Bold' }]}>Total Price</Text>
            <View style={styles.divider} />
            <Text style={[styles.totalValue, { color: 'red', fontWeight: 'bold' }]}>{totalPrice} $</Text>
          </View>
        </View>
        <TouchableOpacity
  style={styles.nextButton}
  onPress={() => {
    const totalDuration = getTotalDuration(); // <- Add this above navigation.navigate()

    navigation.navigate("SelectCustomerScreen", {
      specialist,
      selectedServices,
      totalPrice,
      totalDuration,
    });
  }}
>
  <Text style={styles.nextButtonText}>NEXT</Text>
</TouchableOpacity>

      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 280,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'SemiBold',
  },
  step: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    overflow: 'hidden',
  },
  activeTab: {
    flex: 1,
    backgroundColor: '#FF402D',
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
  },
  inactiveTab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  serviceTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  duration: {
    fontSize: 12,
    color: 'gray',
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    color: '#01579b',
    fontWeight: 'bold',
  },
  totalContainer: {
    paddingTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 14,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // Android shadow
    elevation: 10,
    paddingBottom: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  nextButton: {
    backgroundColor: '#FF402D',
    padding: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  totalLabel:{
    fontFamily: 'SemiBold',
    marginBottom: 10,
  },
  totalvalue:{
    fontFamily: 'Medium',
    marginBottom: 10,
  },
});
