import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Text, View, ActivityIndicator, Image } from 'react-native';

const AppLoading = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Regular': require('../../assets/Fonts/Sofia Pro Regular Az.otf'),
          'Bold': require('../../assets/Fonts/Sofia Pro Bold Az.otf'),
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Light': require('../../assets/Fonts/Sofia Pro Light Az.otf'),
          'Thin': require('../../assets/Fonts/Sofia Pro UltraLight Az.otf'),
          'ExtraBold': require('../../assets/Fonts/Sofia Pro Bold Az.otf'),
          'SemiBold': require('../../assets/Fonts/Sofia Pro Semi Bold Az.otf'),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error("Error loading fonts", error);
      }
    };
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E3B2F' }}>
        <Image source={require('../assets/images/spotnew.jpeg')} style={{ width: 300, height: 110, marginBottom: 142 }} />
        <ActivityIndicator size="large" color='#FFFFFF' style={{ marginBottom: -120 }} />
      </View>
    );
  }

  return children;
};

export default AppLoading;