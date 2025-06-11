import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import Home from './Tabs/Home';
import Calender from './Tabs/Calender';
import Stats from './Tabs/Stats';
import Profile from './Tabs/Profile';
import Logo from '../../assets/images/logo.svg'
import Notification from '../../assets/images/notification.svg'
import Filter from '../../assets/images/filters.svg'
import SpecialistOrange from '../../assets/images/SpecialistOrange.svg'
import SpecialistIcon from '../../assets/images/SpecialistIcon.svg'
import Menu from '../../assets/images/menu.svg'
import HomeIcon from '../../assets/images/home.svg'
import HomeOrange from '../../assets/images/orangehome.svg'
import CalenderIcon from '../../assets/images/calendericon.svg'
import CalenderOrange from '../../assets/images/Calender.svg'
import StatsIcon from '../../assets/images/stats.svg'
import StatsOrange from '../../assets/images/orangestats.svg'
import ProfileIcon from '../../assets/images/profileicon.svg'
import ProfileOrange from '../../assets/images/orangeprofile.svg'
import Specialists from './Tabs/Specialists/Specialists';

// Dummy Screens (replace with real ones)
const HomeScreen = () => <View style={styles.screen}><Home /></View>;
const CalendarScreen = () => <View style={styles.screen}><Calender /></View>;
const ShareScreen = () => <View style={styles.screen}><Stats /></View>;
const SpecialistsScreen = () => <View style={styles.screen}><Specialists /></View>;
const ProfileScreen = () => <View style={styles.screen}><Profile /></View>;
const TransactionsScreen = () => <View style={styles.screen}><Text>Transactions</Text></View>;
// 定义一个名为CustomersScreen的函数组件
const CustomersScreen = () => <View style={styles.screen}><Text>Customers</Text></View>;
const FollowersScreen = () => <View style={styles.screen}><Text>Followers</Text></View>;
const ReviewsScreen = () => <View style={styles.screen}><Text>Reviews</Text></View>;
const ViewsScreen = () => <View style={styles.screen}><Text>Views</Text></View>;
const SettingsScreen = () => <View style={styles.screen}><Text>Settings</Text></View>;
const LogoutScreen = () => <View style={styles.screen}><Text>Logging out...</Text></View>;

// Create Navigators
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs({ navigation }) {
    return (
      <Tab.Navigator
        screenOptions={{
        tabBarShowLabel: false, 
          headerShown: true,
          headerTitle: () => null, 
          headerTitleContainerStyle: {
            paddingBottom: 20, 
          },
          headerStyle: {
            backgroundColor: '#0f2c5d',
            height: 120, 
           
          },
          headerTintColor: '#fff',
          headerTitle: () => null, 
          headerLeft: () => (
            <Logo
              style={{ width: 120, height: 40, marginLeft: 22, paddingBottom: 20, }}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginHorizontal: 20,gap: 33, }}>
              <TouchableOpacity
                onPress={() => {
                  // Handle notifications
                  console.log('Notifications pressed');
                }}
                style={{ marginHorizontal: 5 }}
              >
                <Notification />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // Handle filter action
                  console.log('Filter pressed');
                }}
                style={{ marginHorizontal: 5 }}
              >
               <Filter />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={{ marginHorizontal: 5 }}
              >
                <Menu />
              </TouchableOpacity>
            </View>
          ),
          tabBarStyle: { backgroundColor: '#fff', height: 70, paddingTop: 12, },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
           <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <HomeOrange width={24} height={24} /> : <HomeIcon width={24} height={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? < CalenderOrange width={24} height={24} /> : <CalenderIcon width={24} height={24} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Specialists"
        component={Specialists}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <SpecialistOrange width={24} height={24} /> : <SpecialistIcon width={24} height={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <StatsOrange width={24} height={24} /> : <StatsIcon width={24} height={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <ProfileOrange width={24} height={24} /> : <ProfileIcon width={24} height={24} />
          ),
        }}
      />
      </Tab.Navigator>
    );
  }
  

  

// Custom Drawer Content with icons
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#0f2c5d' }}>
      <View style={{ padding: 20 }}>
      </View>
      <DrawerItem
        label="Customers"
        labelStyle={styles.drawerLabel}
        icon={() => <Ionicons name="people-outline" size={22} color="#fff" />}
        onPress={() => props.navigation.navigate('Customers')}
      />
      <DrawerItem
        label="Settings"
        labelStyle={styles.drawerLabel}
        icon={() => <Ionicons name="settings-outline" size={22} color="#fff" />}
        onPress={() => props.navigation.navigate('Settings')}
      />
      <DrawerItem
        label="Logout"
        labelStyle={styles.drawerLabel}
        icon={() => <MaterialIcons name="logout" size={22} color="#fff" />}
        onPress={() => props.navigation.navigate('Logout')}
      />
    </DrawerContentScrollView>
  );
}

// Drawer Navigator
export default function MainAppNavigator() {
  return (
    <>    
    <StatusBar barStyle="light-content" />
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
     
      <Drawer.Screen name="MainTabs">
  {(props) => <BottomTabs {...props} />}
</Drawer.Screen>
      <Drawer.Screen name="Transactions" component={TransactionsScreen} />
      <Drawer.Screen name="Customers" component={CustomersScreen} />
      <Drawer.Screen name="Followers" component={FollowersScreen} />
      <Drawer.Screen name="Reviews" component={ReviewsScreen} />
      <Drawer.Screen name="Views" component={ViewsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
