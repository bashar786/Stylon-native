// SalonInfoScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRef } from 'react';
import { useNavigation } from 'expo-router';

const SalonInfoScreen = () => {
  const navigation = useNavigation();
  const [coverImage, setCoverImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [creditCardEnabled, setCreditCardEnabled] = useState(true);

  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Hair Salon', value: 'Hair Salon' },
    { label: 'Spa', value: 'Spa' },
    { label: 'Barber Shop', value: 'Barber Shop' },
    { label: 'Nail Salon', value: 'Nail Salon' },
  ]);
  
const salonNameRef = useRef();
const salonAddressRef = useRef();
const contactRef = useRef();
const instagramRef = useRef();
const directionRef = useRef();
const descriptionRef = useRef();
const bankCodeRef = useRef();
const branchCodeRef = useRef();
const accountRef = useRef();

  return (
<KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subtitle}>Hello, nice to meet you!</Text>
      <View style={styles.header}>
        <Text style={styles.title}>Add Salon Information</Text>
        <Text style={styles.step}>1/3</Text>
      </View>

      <Text style={styles.sectionTitle}>Upload Cover & Logo</Text>

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

      <TextInput placeholderTextColor="#333" style={styles.input} placeholder="Salon Name" />
      
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
    style={{borderWidth: 0, color: '#222', fontFamily: 'Medium', paddingHorizontal: 20,}}
    containerStyle={{ marginBottom: open ? 180 : 8 }}
    placeholder="Select a category"
  />
</View>


      </View>

      <TextInput
      ref={salonAddressRef}
      placeholder="Salon Address"
      placeholderTextColor="#333"
      style={styles.input}
      returnKeyType="next"
      onSubmitEditing={() => contactRef.current?.focus()}
       />
      <TextInput
     ref={contactRef}
     placeholder="Contact Number"
     placeholderTextColor="#333"
     style={styles.input}
     keyboardType="phone-pad"
     returnKeyType="next"
     onSubmitEditing={() => instagramRef.current?.focus()}
      />
      
      <TextInput 
      ref={instagramRef}
      placeholder="Instagram"
      placeholderTextColor="#333"
      style={styles.input}
      returnKeyType="next"
      onSubmitEditing={() => directionRef.current?.focus()}

       />

      <View style={styles.inputWithIcon}>
        <TextInput
          ref={directionRef}
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
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Tell us about your Salon..."
        multiline
        placeholderTextColor="#333"
        returnKeyType="next"
        onSubmitEditing={() => bankCodeRef.current?.focus()}
      />

      <View style={styles.creditToggleRow}>
        <Text style={styles.creditText}>Get paid with credit card?</Text>
        <Ionicons name="help-circle-outline" size={16} color="#888" />
        <Switch
          value={creditCardEnabled}
          onValueChange={() => setCreditCardEnabled(!creditCardEnabled)}
          color="#FF3E3E"
        />
      </View>

      <View style={styles.row}>
        <TextInput
           ref={bankCodeRef}
           placeholder="Bank Code"
           keyboardType="phone-pad"
           placeholderTextColor="#333"
           style={styles.inputHalf}
           returnKeyType="next"
           onSubmitEditing={() => branchCodeRef.current?.focus()}/>
        <TextInput    
        ref={branchCodeRef}
    placeholder="Branch Code"
    placeholderTextColor="#333"
    style={styles.inputHalf}
    returnKeyType="next"
    keyboardType="phone-pad"
    onSubmitEditing={() => accountRef.current?.focus()}
    placeholderStyle={{
      color: '#333',
      fontFamily: 'Regular',

    }}
          />
      </View>

      <TextInput 
      placeholderTextColor="#333"
      ref={accountRef}
      keyboardType="phone-pad"
      placeholder="Account Number"
    style={styles.input}
  returnKeyType="done"
   />

        <TouchableOpacity
          style={styles.gradientButton}
          onPress={() => navigation.navigate('SaloonServicesScreen')}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.contactBtn}>
        <Text style={styles.contactText}>Contact Us</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default SalonInfoScreen;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontFamily: 'Regular',
    fontSize: 14,
    marginTop: 74,
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
    height: 50,
    width: 50,
    alignSelf: 'center',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  logoImage: {
    width: 50,
    height: 50,
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
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  creditToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 10,
  },
  creditText: {
    fontSize: 14,
    fontFamily: 'Regular',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    fontFamily: 'Regular',
    fontSize: 15,
    width: '48%'
  },
  nextButton: {
    marginTop: 20,
  },
  gradientButton: {
    padding: 20,
    borderRadius: 26,
    fontFamily: 'Medium',
    alignItems: 'center',
    backgroundColor: '#FF402D',
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