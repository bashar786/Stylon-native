import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import HomeImg from '../../../assets/images/Home-Main.svg';
import PhoneIcon from '../../../assets/images/number.svg';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

const Index = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [isChecked, setChecked] = useState(false);

  // ✅ Auto-prepend "+" and remove unwanted characters
  const handlePhoneChange = (value) => {
    let cleaned = value.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned.replace(/[^\d]/g, '');
    }
    setPhone(cleaned);
  };

  // ✅ Phone number validation
  const handleLogin = () => {
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      alert('Please enter a valid phone number with country code.');
      return;
    }

    navigation.navigate('OtpNumberScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.Main}>
          <HomeImg style={styles.HomeImg} height={275} />
          <View style={styles.InputContainer}>
            <Text style={styles.GreyText}>Hello, nice to meet you!</Text>
            <Text style={styles.heading}>Join our Community test</Text>
            <View style={styles.inputBox}>
              <PhoneIcon width={24} height={24} style={styles.icon} />
              <TextInput
                keyboardType="phone-pad"
                style={styles.Input}
                placeholder="Phone Number"
                placeholderTextColor={'#000'}
                value={phone}
                onChangeText={handlePhoneChange}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                maxLength={12}
              />
            </View>
          </View>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={[
                styles.Button,
                {
                  backgroundColor:
                    phone.trim().length > 0 ? '#FF402D' : '#FF402D80',
                },
              ]}
              disabled={phone.trim().length === 0}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.Bottom}>
              Don't have an account{' '}
              <Text
                onPress={() => navigation.navigate('RegisterNumberInputScreen')}
                style={{ fontWeight: 'bold', color: '#FF402D' }}
              >
                Register
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  Main: {
    padding: 20,
    flex: 1,
  },
  HomeImg: {},
  InputContainer: {},
  heading: {
    fontFamily: 'Bold',
    fontSize: 28,
    color: '#FF402D',
  },
  GreyText: {
    fontFamily: 'Regular',
    fontSize: 14,
    marginTop: 70,
    color: '#203052',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9D9D9D',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 50,
    padding: 0,
    borderRadius: 16,
  },
  agreementText: {
    fontFamily: 'Regular',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  Bottom: {
    fontFamily: 'Regular',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: 32,
  },
  icon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  Input: {
    fontFamily: 'Regular',
    color: '#000000',
    fontSize: 16,
    flex: 1,
  },
  CheckBoxContainer: {
    flexDirection: 'row',
    marginTop: 48,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#FE4E00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 26,
    fontFamily: 'Medium',
    marginTop: 113,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Medium',
  },
  ButtonContainer: {
    marginTop: 75,
  },
});
