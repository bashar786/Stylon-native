import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Index = () => {
  const navigation = useNavigation();
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);

  const [categories, setCategories] = useState([
    'Haircut', 'Nail Art', 'Makeup', 'Massage', 'Hair Color'
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [newService, setNewService] = useState({ name: '', price: '', duration: '' });
  const [services, setServices] = useState([]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const addService = () => {
    if (newService.name && newService.price && newService.duration) {
      setServices([...services, newService]);
      setNewService({ name: '', price: '', duration: '' });
      setServiceModalVisible(false);
    }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
  >
     <View style={{ flex: 1 }}>
    <KeyboardAwareScrollView  contentContainerStyle={[styles.container, { flexGrow: 1 }]}
    >
      <Text style={styles.subtitle}>Hello, nice to meet you!</Text>
      <View style={styles.header}>
        <Text style={styles.title}>Add Salon Services</Text>
        <Text style={styles.step}>2/3</Text>
      </View>

      {/* Add Category Section */}
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Add Service Categories</Text>
        <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
          <AntDesign name="pluscircleo" size={20} color="#707070" />
        </TouchableOpacity>
      </View>

      {/* Selected Categories */}
      <View style={styles.selectedItemsContainer}>
      {selectedCategories.map((cat, index) => (
        <View key={index} style={styles.selectedItem}>
          <Text style={styles.selectedText}>{cat}</Text>
        </View>
      ))}
      </View>

      {/* Add Service Section */}
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Add Services</Text>
        <TouchableOpacity onPress={() => setServiceModalVisible(true)}>
          <AntDesign name="pluscircleo" size={20} color="#707070" />
        </TouchableOpacity>
      </View>

      {/* Added Services */}
      {services.map((srv, index) => (
        <View key={index} style={styles.serviceBox}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <Text style={styles.serviceName}>{srv.name}</Text>
          <Text style={styles.servicePrice}>${srv.price}</Text>
          </View>
          <Text style={styles.serviceDuration}>({srv.duration} mins)</Text>
        </View>
      ))}

      {/* Category Modal */}
      <Modal isVisible={categoryModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.sectionTitle}>Select Categories</Text>
          <TextInput
            style={styles.input}
            placeholder="Search Categories..."
            onChangeText={setSearchText}
          />
          <FlatList
            data={categories.filter(cat => cat.toLowerCase().includes(searchText.toLowerCase()))}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  selectedCategories.includes(item) && { backgroundColor: '#FF402D' }
                ]}
                onPress={() => toggleCategory(item)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategories.includes(item) && { color: '#fff' }
                ]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.gradientButton}
            onPress={() => setCategoryModalVisible(false)}
          >
            <Text style={styles.nextText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Service Modal */}
      <Modal isVisible={serviceModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.sectionTitle}>Add Service</Text>
          <TextInput
            style={styles.input}
            placeholder="Service Name"
            value={newService.name}
            onChangeText={(text) => setNewService({ ...newService, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Price ($)"
            keyboardType="numeric"
            value={newService.price}
            onChangeText={(text) => setNewService({ ...newService, price: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration (in minutes)"
            keyboardType="numeric"
            value={newService.duration}
            onChangeText={(text) => setNewService({ ...newService, duration: text })}
          />
          <TouchableOpacity
            style={styles.gradientButton}
            onPress={addService}
          >
            <Text style={styles.nextText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </KeyboardAwareScrollView>

      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
      <TouchableOpacity
          style={styles.gradientButton}
          onPress={() => navigation.navigate('MainApp')}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.contactBtn}>
        <Text style={styles.contactText}>Contact Us</Text>
      </TouchableOpacity>
      </View>
    </View>

    </KeyboardAvoidingView>

  );
};

export default Index;

const styles = StyleSheet.create({
  // Include your existing styles...

  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
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
    fontSize: 20,
    fontFamily: 'Bold',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 41,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    fontFamily: 'Regular',
  },
  gradientButton: {
    marginTop: 10,
    backgroundColor: '#FF402D',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontFamily: 'Bold',
  },
  categoryItem: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 5,
  },
  categoryText: {
    fontFamily: 'Regular',
    fontSize: 14,
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#8A8A8A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 21,
  },
  selectedText: {
    fontFamily: 'Regular',
    fontSize: 14,
    color: '#8A8A8A'
  },
  serviceBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
    borderBottomWidth: 0.5,
    borderColor: '#707070',
  },
  serviceName: {
    fontFamily: 'Medium',
    fontSize: 20,
    color: '#000'
  },
  servicePrice: {
    fontFamily: 'Medium',
    fontSize: 18,
    color: '#000'
  },
  serviceDuration: {
    fontFamily: 'Regular',
    fontSize: 16,
    color: '#8A8A8A',
    marginTop: 5,
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
