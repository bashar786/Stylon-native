import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = (width - 60) / 2; // 3 images per row, with margin

const GalleryUploader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  
  // New state for fullscreen image modal
  const [fullImage, setFullImage] = useState(null);

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
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = () => {
    if (selectedImage) {
      setGallery([...gallery, selectedImage]);
      setSelectedImage(null);
      setModalVisible(false);
    }
  };

  const deleteImage = (uri) => {
    setGallery(gallery.filter((item) => item !== uri));
  };

  return (
    <View style={styles.container}>
      {/* Image grid */}
      <View style={styles.gallery}>
        {gallery.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setFullImage(uri)}  // Open full image modal
            >
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => deleteImage(uri)}
            >
              <Feather name="trash-2" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Add picture button fixed at bottom */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add a Picture</Text>
      </TouchableOpacity>

      {/* Modal to pick and upload image */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedImage(null);
              }}
            >
              <AntDesign name="closecircle" size={24} color="grey" />
            </TouchableOpacity>

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              ) : (
                <Text>Select Image</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fullscreen image modal */}
      <Modal visible={!!fullImage} transparent animationType="fade">
        <View style={styles.fullscreenModal}>
          <TouchableOpacity
            style={styles.fullscreenClose}
            onPress={() => setFullImage(null)}
          >
            <AntDesign name="closecircle" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: fullImage }}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

export default GalleryUploader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 80,  // Leave space for the fixed button
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.4)',  // Add some background so icon is visible
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: '#FE4E00',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    fontFamily: 'Bold',
  },
  imagePicker: {
    height: 200,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: '#FE4E00',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Bold',
  },
  fullscreenModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullscreenImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  fullscreenClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
});
