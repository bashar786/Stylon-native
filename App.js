import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import LoginNumberInputScreen from './Screens/Login/NumberInputScreen/Index';
import LoginOtpNumberScreen from './Screens/Login/NumberOtpscreen/Index';
import RegisterNumberInputScreen from './Screens/SignUp/NumberInputScreen/Index';
import RegisterOtpNumberScreen from './Screens/SignUp/NumberOtpscreen/Index';
import SaloonInfoScreen from './Screens/SignUp/SaloonInfoScreen/Index';
import SaloonServicesScreen from './Screens/SignUp/SaloonServicesScreen/Index';
import Navigation from './Screens/Navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CreateAppointment from './Screens/Navigation/Tabs/components/CreateAppoitment/CreateAnAppointment'
import CreateAnAppointment from './Screens/Navigation/Tabs/components/CreateAppoitment/CreateAnAppointment';
import SelectCustomer from './Screens/Navigation/Tabs/components/CreateAppoitment/SelectCustomer/SelectCustomer';
import ConfirmBookingScreen from './Screens/Navigation/Tabs/components/CreateAppoitment/ConfirmBooking/ConfirmBooking';
import SuccessfullyBookedScreen from './Screens/Navigation/Tabs/components/CreateAppoitment/ConfirmBooking/SuccessfullyBooked';
import AppointmentHistory from './Screens/Navigation/Tabs/components/AppointmentHistory/AppointmentHistory';
import AppointmentHistoryDetail from './Screens/Navigation/Tabs/components/AppointmentHistory/AppointmentHistoryDetail';



const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Regular': require('./assets/Fonts/Sofia Pro Regular Az.otf'),
    'Medium': require('./assets/Fonts/Sofia Pro Medium Az.otf'),
    'Bold': require('./assets/Fonts/Sofia Pro Bold Az.otf'),
    'Light': require('./assets/Fonts/Sofia Pro Light Az.otf'),
    'Thin': require('./assets/Fonts/Sofia Pro UltraLight Az.otf'),
    'ExtraBold': require('./assets/Fonts/Sofia Pro Bold Az.otf'),
    'SemiBold': require('./assets/Fonts/Sofia Pro Semi Bold Az.otf'),
  });
  
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
    <StatusBar 
      barStyle="dark-content" // This makes the text white
      backgroundColor="transparent"
      translucent={true}
    />
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginNumberInputScreen"
         screenOptions={{
          headerShown: false, 
        }}
        >
          
          <Stack.Screen name="LoginNumberInputScreen" component={LoginNumberInputScreen} />
          <Stack.Screen name="OtpNumberScreen" component={LoginOtpNumberScreen} />
          <Stack.Screen name="RegisterNumberInputScreen" component={RegisterNumberInputScreen} />
          <Stack.Screen name="RegisterOtpNumberScreen" component={RegisterOtpNumberScreen} />
          <Stack.Screen name="SaloonInfoScreen" component={SaloonInfoScreen} />
          <Stack.Screen name="SaloonServicesScreen" component={SaloonServicesScreen} />
          <Stack.Screen name="MainApp" component={Navigation} options={{ headerShown: false }} />
          <Stack.Screen name="CreateAnAppointment" component={CreateAnAppointment} />
          <Stack.Screen name="SelectCustomerScreen" component={SelectCustomer} />
          <Stack.Screen name="ConfirmBooking" component={ConfirmBookingScreen} />
          <Stack.Screen name="SuccessfullyBookedScreen" component={SuccessfullyBookedScreen} />
          <Stack.Screen name="AppointmentHistory" component={AppointmentHistory} />
          <Stack.Screen name="AppointmentHistoryDetail" component={AppointmentHistoryDetail} />

          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </Provider>
  );
}
