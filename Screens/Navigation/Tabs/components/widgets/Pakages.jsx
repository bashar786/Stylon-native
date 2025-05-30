// Packages.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet,
  Modal, Image, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Keyboard } from 'react-native';

const Packages = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [packages, setPackages] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };
  

  const addPackage = () => {
    if (name && price && image) {
      setPackages([...packages, { name, price, image }]);
      setModalVisible(false);
      setImage(null);
      setName('');
      setPrice('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Create New Package</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="pluscircleo" size={20} color="#707070" />
        </TouchableOpacity>
      </View>

      {packages.map((pkg, index) => (
        <View key={index} style={styles.packageCard}>
          <Image source={{ uri: pkg.image }} style={styles.packageImage} />
          <View style={styles.packageInfo}>
            <Text style={styles.packageName}>{pkg.name}</Text>
            <Text style={styles.packagePrice}>{pkg.price} $</Text>
          </View>
        </View>
      ))}

      {/* Modal for Add Package */}
      <Modal visible={modalVisible} transparent animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>

      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible(false)}
      >
        <AntDesign name="closecircle" size={24} color="grey" />
      </TouchableOpacity>

      {/* Image Picker */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <Text>Select Image</Text>
        )}
      </TouchableOpacity>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Service Name"
        placeholderTextColor={'gray'}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor={'gray'}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        returnKeyType='done'
        onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={addPackage}>
        <Text style={styles.addButtonText}>Add Package</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

    </ScrollView>
  );
};

export default Packages;

const styles = StyleSheet.create({
  scrollContent: { paddingTop: 32, },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold',
    fontFamily: 'Bold',
},

  packageCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#D8D8D8'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  
  packageImage: { width: '100%', height: 180 },
  packageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  packageName: { fontSize: 16, fontFamily: 'Regular', },
  packagePrice: { fontWeight: 'bold', fontSize: 16 ,fontFamily: 'Bold',},

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 31,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 31,
  },
  imagePicker: {
    height: 170,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 8,
  },
  previewImage: { width: '100%', height: '100%', borderRadius: 8 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    fontFamily: 'Regular',
    marginTop: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#FE4E00',
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: 100,
    fontFamily: 'SemiBold',
    marginTop: 22,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontFamily: 'Bold', },
});
