import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewCustomer,
  setSelectedCustomer,
} from '../../../../../../redux/reducer/CustomerSlice';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import ImgPlaceHolder from "../../../../../../assets/images/ImgPlaceHolder.png";
import DropDownPicker from 'react-native-dropdown-picker';
import CreatingCustomer from './SelectCustomerModal'


const CustomerSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { selectedServices, specialist, totalPrice, totalDuration } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const allCustomers = useSelector(state => state.customer.allCustomers);
  const selectedCustomer = useSelector(state => state.customer.selectedCustomer);

  const [modalVisible, setModalVisible] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    gender: '',
    image: null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setNewCustomer({ ...newCustomer, image: result.assets[0].uri });
    }
  };
  

  const handleCustomerSelect = (customer) => {
    dispatch(setSelectedCustomer(customer));
  };

  const handleAddCustomer = () => {
  const { name, phone, gender, image } = newCustomer;

  if (!name.trim() || !phone.trim() || !gender || !image) {
    alert('Please fill all fields and upload an image.');
    return;
  }

  const id = Date.now();
  const customerWithId = { ...newCustomer, id };
  dispatch(addNewCustomer(customerWithId));
  dispatch(setSelectedCustomer(customerWithId));
  setModalVisible(false);
  setNewCustomer({ name: '', phone: '', gender: '', image: null });
  
};
const [genderOpen, setGenderOpen] = useState(false);
const [genderValue, setGenderValue] = useState(null);
const [genderItems, setGenderItems] = useState([
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]);


  const handleNext = () => {
    if (!selectedCustomer) return;
    console.log('Selected customer:', selectedCustomer);
    navigation.navigate('ConfirmBooking', {
      selectedServices,
      specialist,
      totalPrice,
      totalDuration,
      selectedCustomer,
    });
  };

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCustomerSelect(item)}
      style={styles.customerCard}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={
            item.image
              ? { uri: item.image }
              : require('../../../../../../assets/images/default-img.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.customerName}>{item.name}</Text>
      </View>
      <Ionicons
        name={
          selectedCustomer?.id === item.id
            ? 'radio-button-on'
            : 'radio-button-off'
        }
        size={20}
        color="#FF5722"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Appointment</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.headerRow}>
  <Text style={styles.subTitle}>Select Customer</Text>
  <TextInput
    style={styles.searchInput}
    placeholder="Search by name or number"
    value={searchQuery}
    onChangeText={setSearchQuery}
    placeholderTextColor="#999"
  />
</View>


      <TouchableOpacity
        style={styles.addNewButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}> Add New Customer</Text>
        <Ionicons name="add-circle-outline" size={20} color="black" />
      </TouchableOpacity>

      <FlatList
       data={allCustomers.filter(customer =>
         customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         customer.phone.includes(searchQuery)
       )}
     
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <TouchableOpacity
        style={[
          styles.nextButton,
          { backgroundColor: selectedCustomer ? '#FF5722' : '#ccc' },
        ]}
        onPress={handleNext}
        disabled={!selectedCustomer}
      >
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>

      {/* Modal to add new customer */}
      <CreatingCustomer
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  newCustomer={newCustomer}
  setNewCustomer={setNewCustomer}
  genderOpen={genderOpen}
  setGenderOpen={setGenderOpen}
  genderValue={genderValue}
  setGenderValue={setGenderValue}
  genderItems={genderItems}
  setGenderItems={setGenderItems}
  pickImage={pickImage}
  handleAddCustomer={handleAddCustomer}
/>


    </View>
  );
};

export default CustomerSelectionScreen;

const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 250,
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
    subTitle:{
      fontFamily: 'SemiBold',
      fontSize: 20,
      marginTop: 20,
    },
    headerRow: {
      gap: 15,
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 12,
      fontFamily: 'Regular',
      fontSize: 14,
      color: '#333',
    },
    addNewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 6,
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    addText: {
      color: '#000',
      fontFamily: 'Medium',
      fontSize: 16,
    },
    customerCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 24,
      paddingHorizontal: 24,
      marginBottom: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#D8D8D8',
    },
    customerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: '100%',
      backgroundColor: '#eee',
      alignItems: 'center',
      textAlign: 'center',
      borderWidth: 1,
      borderColor:'#FF402D',
      padding: 5,
    },
    customerName: {
      fontFamily: 'SemiBold',
      fontSize: 16,
      color: '#000',
      paddingLeft: 20,
    },
    nextButton: {
      position: 'absolute',
      bottom: 20,
      backgroundColor: '#FF402D',
      paddingVertical: 16,
      borderRadius: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      alignSelf: 'center',
    },
    nextButtonText: {
      color: 'white',
      fontFamily: 'SemiBold',
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
      paddingHorizontal: 16,
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 20,
    },
    closeModal: {
      alignSelf: 'flex-end',
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'SemiBold',
      marginBottom: 16,
    },
    imagePicker: {
      height: 120,
      backgroundColor: '#f0f0f0',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadedImage: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
      
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#eee',
      borderWidth: 1,
      borderColor: '#ccc',
      alignSelf: 'center',
      marginBottom: 10,

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
    picker: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 16,
      fontFamily: 'Regular',
    },
    addButton: {
      backgroundColor: '#FF402D',
      paddingVertical: 12,
      borderRadius: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: 'white',
      fontFamily: 'SemiBold',
      fontSize: 16,
    },
  });
  