import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import About from './components/widgets/About';
import Services from './components/widgets/Services';
import Gallery from './components/widgets/Gallery';
import CalenderImage from '../../../assets/images/calendaradd.svg';
import ProfileInfo from './components/widgets/ProfileInfo'
const Colors = {
  primary: '#FE4E00',
  secondary: '#F5F5F5',
};

const ActivityScreen = () => {
  const [selectedTab, setSelectedTab] = useState('About');

  const renderComponent = () => {
    switch (selectedTab) {
      case 'About':
        return <About />;
      case 'Services':
        return <Services />;
      case 'Gallery':
        return <Gallery />;
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
          <View style={styles.calendarWrapper}>
      <ProfileInfo
        backgroundImage={require('../../../assets/images/saloonbannerimg.png')}
        logoImage={require('../../../assets/images/saloonimg.png')}
       name="SK Salon & SPA"
       address="612 1c1 Township, Lahore"
       rating={4.2}
       reviewCount={125}
      />
          </View>
        <View style={styles.container}>
        

          <View style={styles.tabContainer}>
            {['About', 'Services', 'Gallery'].map((tab) => (
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
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Medium',
    width: '100%',
    paddingHorizontal: 20,
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
