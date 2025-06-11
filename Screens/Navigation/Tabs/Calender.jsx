import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Upcoming from './components/UpcomingAppointments';
import Pending from './components/PendingAppointments';
import History from './components/AppointmentHistory';
import CalenderImage from '../../../assets/images/calendaradd.svg';
import { useNavigation } from 'expo-router';

const Colors = {
  primary: '#FE4E00',
  secondary: '#F5F5F5',
};

const ActivityScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const navigation = useNavigation(); 
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', width: '100%' }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.calendarWrapper}>
            <TouchableOpacity onPress={()=> navigation.navigate('AppointmentHistory')}><Text> <CalenderImage /></Text></TouchableOpacity>
           
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
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab ? styles.selectedTabText : styles.unselectedTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.componentContainer}>
            {renderComponent()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingVertical: 26,
    fontFamily: 'Medium',
    width: '100%',
  },
  calendarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#fff',
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
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
  },
});
