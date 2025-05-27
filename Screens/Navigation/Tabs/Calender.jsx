import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import Upcoming from './components/UpcomingAppointments';
import Pending from './components/PendingAppointments';
import History from './components/AppointmentsHistory';
import CalenderImage from '../../../assets/images/calendaradd.svg'

// Custom colors
const Colors = {
  primary: '#FE4E00',       // Primary blue
};

const ActivityScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');

  const renderComponent = () => {
    switch (selectedTab) {
      case 'Upcoming':
        return <Upcoming />;
      case 'Pending':
        return <Pending />;
      case 'History':
        return <History />;
      default:
        return null;
    }
  };

  const isVirtualizedList = (component) => {
    return component?.type === FlatList || component?.type?.displayName === 'FlatList';
  };

  const selectedComponent = renderComponent();

  return (
    <View style={{flex: 1, backgroundColor: Colors.secondary}}>
      <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
    <CalenderImage />
      </View>
        
        <View style={styles.tabContainer}>
          {['Upcoming', 'Pending', 'History'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                selectedTab === tab ? styles.selectedTab : styles.unselectedTab,
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab ? styles.selectedTabText : styles.unselectedTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.componentContainer}>
          {isVirtualizedList(selectedComponent) ? (
            selectedComponent
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedComponent}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 26,
    fontFamily: 'Medium',
  },
  screenTitle: {
    color: Colors.textDark,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#fff'
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: Colors.primary,
    borderRadius: 13,
  },
  unselectedTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'SemiBold',
  },
  selectedTabText: {
    color: '#fff',
    fontFamily: 'SemiBold',
  },
  unselectedTabText: {
    color: '#000',
    fontFamily: 'SemiBold',
  },
  componentContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});