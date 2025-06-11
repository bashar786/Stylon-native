import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import SuccessBook from '../../../../../../assets/images/BookedSuccess.svg'
import { useNavigation } from 'expo-router';

const ConfirmationScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* SVG */}
      <View style={styles.svgWrapper}>
        <SuccessBook  />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Appointment Booked!</Text>
        <Text style={styles.caption}>You have successfully booked your appointment</Text>
      </View>

      {/* Button at bottom */}
      <TouchableOpacity onPress={()=> navigation.navigate('AppointmentHistory')} style={styles.button}>
        <Text style={styles.buttonText}>GO TO Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationScreen;
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  svgWrapper: {
    marginTop: 180,
    marginBottom: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'SemiBold',
    color: '#000',
    marginBottom: 12,
  },
  caption: {
    fontSize: 16,
    fontFamily: 'Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
    backgroundColor: '#FF5722',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'SemiBold',
    color: '#fff',
  },
});
