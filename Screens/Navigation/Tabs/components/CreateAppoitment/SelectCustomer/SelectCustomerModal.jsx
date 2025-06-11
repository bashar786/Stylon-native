// AddCustomerModal.js

import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import ImgPlaceHolder from '../../../../../../assets/images/ImgPlaceHolder.png';

const AddCustomerModal = ({
  visible,
  onClose,
  newCustomer,
  setNewCustomer,
  genderOpen,
  setGenderOpen,
  genderValue,
  setGenderValue,
  genderItems,
  setGenderItems,
  pickImage,
  handleAddCustomer,
}) => {
    
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeModal} onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Add Customer</Text>

          <TouchableOpacity onPress={pickImage}>
          <Image
  source={
    newCustomer?.image ? { uri: newCustomer.image } : ImgPlaceHolder
  }
  style={styles.imagePreview}
/>

          </TouchableOpacity>

          <TextInput
            placeholder="Name"
            style={styles.input}
            value={newCustomer.name}
            onChangeText={(text) =>
              setNewCustomer({ ...newCustomer, name: text })
            }
          />

          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            keyboardType="phone-pad"
            value={newCustomer.phone}
            onChangeText={(text) =>
              setNewCustomer({ ...newCustomer, phone: text })
            }
          />

          <DropDownPicker
            open={genderOpen}
            value={genderValue}
            items={genderItems}
            setOpen={setGenderOpen}
            setValue={(value) => {
                setGenderValue(value);
                setNewCustomer({ ...newCustomer, gender: value });
              }}
              
            setItems={setGenderItems}
            placeholder="Select Gender"
            containerStyle={{ marginBottom: 16 }}
            style={styles.input}
            textStyle={{
              fontFamily: 'Regular',
              fontSize: 15,
            }}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddCustomer}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddCustomerModal;

const styles = StyleSheet.create({
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
  addButton: {
    backgroundColor: '#FF402D',
    paddingVertical: 16,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Medium',
  },
});
