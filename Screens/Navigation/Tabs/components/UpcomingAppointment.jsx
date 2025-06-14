import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

// Sample props
const AppointmentCard = ({
  userImage,
  userName,
  services,
  appointmentDate,
  barberName,
  onComplete,
  onCancel,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar.Image size={50} source={{ uri: userImage }} />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceRow}>
            <FontAwesome name="check" size={16} color="red" />
            <Text style={styles.serviceText}>{service.name}</Text>
            <MaterialCommunityIcons name="timer-sand" size={16} color="gray" />
            <Text style={styles.timeText}>{service.duration}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="clock-outline" size={20} />
        <Text style={styles.infoText}>{appointmentDate}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="account" size={20} />
        <Text style={styles.infoText}>{barberName}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
          <Text style={styles.completeText}>COMPLETE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  servicesContainer: {
    marginTop: 12,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  serviceText: {
    flex: 1,
    fontSize: 16,
  },
  timeText: {
    color: 'gray',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  infoText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  completeButton: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 24,
    width: '48%',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 24,
    width: '48%',
    textAlign: 'center'
  },
  completeText: {
    color: '#00C52E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  cancelText: {
    color: '#FF240E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
