import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from 'expo-router';
import { Linking } from 'react-native';

const SalonInfoScreen = () => {
  const navigation = useNavigation();
  const [coverImage, setCoverImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Hair Salon', value: 'Hair Salon' },
    { label: 'Spa', value: 'Spa' },
    { label: 'Barber Shop', value: 'Barber Shop' },
    { label: 'Nail Salon', value: 'Nail Salon' },
  ]);

  // Required field states
  const [salonName, setSalonName] = useState('');
  const [salonAddress, setSalonAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [instagram, setInstagram] = useState('');
  const [direction, setDirection] = useState('');
  const [description, setDescription] = useState('');

  // Refs for input focus
  const salonAddressRef = useRef();
  const contactRef = useRef();
  const instagramRef = useRef();
  const directionRef = useRef();
  const descriptionRef = useRef();

  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (
      !salonName ||
      !value || // category
      !salonAddress ||
      !contactNumber ||
      !instagram ||
      !direction ||
      !description
    ) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    // All good, navigate to next screen
    navigation.navigate('SaloonServicesScreen');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{ marginTop: 30 }}>
            <Ionicons name="arrow-back" size={30} color="#FF402D" />
          </TouchableOpacity>
      <Text style={styles.subtitle}>Hello, nice to meet you!</Text>
      <View style={styles.header}>
        <Text style={styles.title}>Add Salon Information</Text>
        <Text style={styles.step}>1/3</Text>
      </View>

      {/* Cover Upload */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upload Cover</Text>
        <TouchableOpacity
          style={styles.coverImageBox}
          onPress={() => pickImage(setCoverImage)}
        >
          {coverImage ? (
            <Image source={{ uri: coverImage }} style={styles.coverImage} />
          ) : (
            <Ionicons name="cloud-upload-outline" size={32} color="#888" />
          )}
        </TouchableOpacity>
      </View>

      {/* Logo Upload */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upload Logo</Text>
        <TouchableOpacity
          style={styles.logoBox}
          onPress={() => pickImage(setLogoImage)}
        >
          {logoImage ? (
            <Image source={{ uri: logoImage }} style={styles.logoImage} />
          ) : (
            <Ionicons name="cloud-upload-outline" size={24} color="#888" />
          )}
        </TouchableOpacity>
      </View>

      <TextInput
        value={salonName}
        onChangeText={setSalonName}
        placeholder="Salon Name"
        placeholderTextColor="#333"
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => salonAddressRef.current?.focus()}
      />

      {/* Dropdown */}
      <View style={styles.dropdownContainer}>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownDirection="BOTTOM"
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownMenu}
            style={{ borderWidth: 0 }}
            listMode="SCROLLVIEW"
            containerStyle={{ marginBottom: open ? 180 : 8 }}
            placeholder="Select a category"
          />
        </View>
      </View>

      <TextInput
        ref={salonAddressRef}
        value={salonAddress}
        onChangeText={setSalonAddress}
        placeholder="Salon Address"
        placeholderTextColor="#333"
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => contactRef.current?.focus()}
      />

      <TextInput
        ref={contactRef}
        value={contactNumber}
        onChangeText={setContactNumber}
        placeholder="Contact Number"
        placeholderTextColor="#333"
        style={styles.input}
        keyboardType="phone-pad"
        returnKeyType="next"
        onSubmitEditing={() => instagramRef.current?.focus()}
      />

      <TextInput
        ref={instagramRef}
        value={instagram}
        onChangeText={setInstagram}
        placeholder="Instagram"
        placeholderTextColor="#333"
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => directionRef.current?.focus()}
      />

      <View style={styles.inputWithIcon}>
        <TextInput
          ref={directionRef}
          value={direction}
          onChangeText={setDirection}
          placeholder="Salon Direction"
          placeholderTextColor="#333"
          style={styles.inputFlex}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current?.focus()}
        />
        <Ionicons name="location-outline" size={20} color="#888" />
      </View>

      <TextInput
        ref={descriptionRef}
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Tell us about your Salon..."
        multiline
        placeholderTextColor="#333"
        returnKeyType="done"
      />

      {/* Next Button */}
      <TouchableOpacity style={styles.gradientButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>

      {/* Contact Us */}
      <TouchableOpacity
  style={styles.contactBtn}
  onPress={() => Linking.openURL('https://wordpress-1394520-5503173.cloudwaysapps.com/contact-us/')}
>
  <Text style={styles.contactText}>Contact Us</Text>
</TouchableOpacity>

    </KeyboardAwareScrollView>
  );
};

export default SalonInfoScreen;

// Styles
const styles = StyleSheet.create({
  dropdownText: {
    fontFamily: 'Regular',
    fontSize: 15,
    color: '#000',
  },
  dropdownMenu: {
    borderWidth: 0,
    borderColor: '#9D9D9D',
    borderRadius: 16,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontFamily: 'Regular',
    fontSize: 14,
    marginTop: 30,
    color: '#203052',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 28,
    color: '#FF402D',
  },
  step: {
    fontFamily: 'ExtraBold',
    fontSize: 25,
    color: '#000',
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'ExtraBold',
    fontSize: 18,
    color: '#000',
  },
  sectionContainer: {
    marginBottom: 10,
  },
  coverImageBox: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    height: 200,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoBox: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    height: 120,
    width: 120,
    alignSelf: 'center',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 100,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    fontFamily: 'Regular',
    fontSize: 15,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  inputFlex: {
    flex: 1,
    height: 48,
    fontFamily: 'Regular',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    padding: 20,
    borderRadius: 26,
    fontFamily: 'Medium',
    alignItems: 'center',
    backgroundColor: '#FF402D',
    marginTop: 10,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Bold',
  },
  contactBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  contactText: {
    color: '#FF3E3E',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Bold',
  },
});
