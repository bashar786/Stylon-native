import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Share,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const BusinessInfoScreen = () => {
  const [expanded, setExpanded] = useState(false);

  const openInstagram = () => Linking.openURL('https://instagram.com');
  const makeCall = () => Linking.openURL('tel:1234567890');
  const openDirections = () => Linking.openURL('https://maps.google.com');

  const shareBusiness = async () => {
    try {
      await Share.share({
        message: 'Check out this business on Google Maps: https://maps.google.com',
      });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const aboutText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={openInstagram} style={styles.iconButton}>
          <Ionicons name="logo-instagram" size={24} color="#F5743B" />
          <Text style={styles.iconText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={makeCall} style={styles.iconButton}>
          <Feather name="phone" size={24} color="#F5743B" />
          <Text style={styles.iconText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDirections} style={styles.iconButton}>
          <Entypo name="location" size={24} color="#F5743B" />
          <Text style={styles.iconText}>Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareBusiness} style={styles.iconButton}>
          <FontAwesome name="share" size={24} color="#F5743B" />
          <Text style={styles.iconText}>Share</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.aboutText}>
        {expanded ? aboutText : `${aboutText.slice(0, 100)}... `}
        <Text style={styles.readMore} onPress={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less' : 'Read More'}
        </Text>
      </Text>

      <Text style={styles.sectionTitle}>Opening Hours</Text>
      <View style={styles.hoursRow}>
        <View style={styles.greenDot} />
        <Text style={styles.dayText}>Monday - Friday</Text>
        <Text style={styles.timeText}>8:30 AM - 10:00 PM</Text>
      </View>
      <View style={styles.hoursRow}>
        <View style={styles.greenDot} />
        <Text style={styles.dayText}>Saturday - Sunday</Text>
        <Text style={styles.timeText}>9:00 AM - 2:00 PM</Text>
      </View>

      <Text style={styles.sectionTitle}>Location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Info</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%'
  },
  iconButton: {
    alignItems: 'center',
    width: '20%',
  },
  iconText: {
    color: 'gray',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Regular',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 8,
    fontFamily: 'Bold',
  },
  aboutText: {
    color: '#444',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Regular',
  },
  readMore: {
    color: '#F5743B',
    fontWeight: 'bold',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginRight: 8,
  },
  dayText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Regular',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Regular',
  },
  map: {
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
  },
  editButton: {
    backgroundColor: '#FF402D',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 40,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SemiBold'
  },
});

export default BusinessInfoScreen;
