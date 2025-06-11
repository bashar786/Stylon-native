// components/ServicesContainer.js
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { AntDesign } from '@expo/vector-icons';

export default function ServicesContainer({
  servicesData,
  activeCategory,
  setActiveCategory,
  selectedServices,
  toggleService,
}) {
  const renderCategory = (category) => {
    const isOpen = activeCategory === category;

    return (
      <View key={category}>
        <TouchableOpacity
          onPress={() => setActiveCategory(isOpen ? '' : category)}
          style={styles.categoryHeader}
        >
          <Text style={styles.categoryText}>{category}</Text>
          <AntDesign name={isOpen ? 'up' : 'down'} size={18} />
        </TouchableOpacity>

        <Collapsible collapsed={!isOpen}>
          {servicesData[category].map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggleService(item)}
              style={styles.serviceItem}
            >
              <View>
                <Text style={styles.serviceTitle}>{item.title}</Text>
                <Text style={styles.duration}>{item.duration}</Text>
              </View>
              <View style={styles.priceSection}>
                <Text style={styles.price}>PKR {item.price.toLocaleString()}</Text>
                <Checkbox.Android
                  status={selectedServices.some(s => s.id === item.id) ? 'checked' : 'unchecked'}
                  color="#FF3D00"
                  uncheckedColor="#ccc"
                />
              </View>
            </TouchableOpacity>
          ))}
        </Collapsible>
      </View>

    );
  };

  return (
    <ScrollView>
      {Object.keys(servicesData).map(renderCategory)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    alignItems: 'center'
  },
  categoryText: {
    fontSize: 18,
    fontFamily: 'SemiBold',
    marginBottom: 2,
    marginTop: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: '#707070',
    alignItems: 'center',
    paddingTop: 20,
  },
  serviceTitle: {
    fontFamily: 'Medium',
    fontSize: 16,
  },
  duration: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Regular',
    marginTop: 5,
  },
  priceSection: {
    alignItems: 'center',
    gap: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  price: {
    color: '#000',
    fontFamily: 'Medium',
    fontSize: 15,
  },
});
