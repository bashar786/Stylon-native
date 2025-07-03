import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, Button, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// Simulated dropdown options
const dropdownOptions = ['Today', 'This Week', 'This Month'];

// Simulated stats for different ranges
const statsByRange = {
  Today: [
    { id: '1', value: '5', label: 'Bookings' },
    { id: '2', value: '250$', label: 'Revenue' },
    { id: '3', value: '18', label: 'Views' },
    { id: '4', value: '4.2', label: 'Avg Rating' },
    { id: '5', value: '4', label: 'Followers' },
    { id: '6', value: '12', label: 'Customers' },
  ],
  'This Week': [
    { id: '1', value: '28', label: 'Bookings' },
    { id: '2', value: '1900$', label: 'Revenue' },
    { id: '3', value: '190', label: 'Views' },
    { id: '4', value: '4.5', label: 'Avg Rating' },
    { id: '5', value: '24', label: 'Followers' },
    { id: '6', value: '80', label: 'Customers' },
  ],
  'This Month': [
    { id: '1', value: '103', label: 'Bookings' },
    { id: '2', value: '7200$', label: 'Revenue' },
    { id: '3', value: '875', label: 'Views' },
    { id: '4', value: '4.3', label: 'Avg Rating' },
    { id: '5', value: '102', label: 'Followers' },
    { id: '6', value: '298', label: 'Customers' },
  ],
};

const StatisticsGrid = () => {
  const [selectedRange, setSelectedRange] = useState('Today');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
    const renderStatCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <LinearGradient colors={['#FC550B', '#FFC055']} style={styles.circleBorder}>
        <View style={styles.innerCircle}>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Dropdown and Title */}
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{ marginTop: 30, marginBottom: 30, }}>
            <Ionicons name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Statistics</Text>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setMenuVisible(true)}
            >
              <Text style={styles.dropdownText}>{selectedRange}</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </TouchableOpacity>
          }
        >
          {dropdownOptions.map((option) => (
            <Menu.Item
              key={option}
              onPress={() => {
                setSelectedRange(option);
                setMenuVisible(false);
              }}
              title={option}
            />
          ))}
        </Menu>
      </View>

      {/* Grid */}
      <FlatList
        data={statsByRange[selectedRange]}
        renderItem={renderStatCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        scrollEnabled={false}
      />
    </View>
  );
};

export default StatisticsGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingVertical: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: 'SemiBold',
    color: '#000',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Regular',
    color: '#000',
    marginRight: 4,
  },
  grid: {
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  card: {
    width: 170,
    height: 170,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBorder: {
    width: 130,
    height: 130,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 27,
    fontFamily: 'Bold',
    color: '#000',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Regular',
    color: '#000',
    textAlign: 'center',
  },
});
