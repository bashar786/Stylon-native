// Services.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import Packages from './Pakages.jsx';
import ServicesTab from './ServicesTab.jsx';

const Services = () => {
  const [activeTab, setActiveTab] = useState('Services');

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Services', 'Packages'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'Packages' ? <Packages /> : <ServicesTab />}
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  tabContainer: { flexDirection: 'row', marginTop: 0, borderWidth: 1, borderColor: '#D8D8D8', borderRadius: 16 },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    color: '#fff'
  },
  activeTab: { backgroundColor: '#FE4E00' },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'SemiBold',
  },
  activeTabText: { color: '#fff' },
});
