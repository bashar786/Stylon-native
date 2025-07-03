import React, { useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPhoneNumber,
  selectTermsAccepted,
} from '../../../redux/reducer/ReducerExport';
import {
  setPhoneNumber,
  acceptTerms,
} from '../../../redux/reducer/SaloonReducer';
import { Linking } from 'react-native';

const Index = () => {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const phoneNumber = useSelector(selectPhoneNumber);
  const registration = useSelector((state) => state.salon.registration);

  useEffect(() => {
    console.log('Registration state updated:', registration);
  }, [registration]);

  // ✅ Format the phone input to always start with '+' and remove other characters
  const handlePhoneChange = (value) => {
    let cleaned = value.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned.replace(/[^\d]/g, '');
    }
    setPhone(cleaned);
  };

  // ✅ Phone number validation and dispatching to Redux
  const handleLogin = () => {
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      alert('Please enter a valid phone number with country code.');
      return;
    }

    if (!isChecked) {
      alert('Please accept the terms and conditions.');
      return;
    }

    dispatch(setPhoneNumber(phone));
    dispatch(acceptTerms(isChecked));
    console.log('dispatched setPhoneNumber:', phone);
    navigation.navigate('RegisterOtpNumberScreen');
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
            <View style={styles.CheckBoxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#FE4E00' : undefined}
                style={styles.checkbox}
              />

<Text style={styles.agreementText}>
  By creating an account, you agree to our{' '}
  <Text
    style={styles.linkText}
    onPress={() =>
      Linking.openURL('https://wordpress-1394520-5503173.cloudwaysapps.com/')
    }
  >
    Terms of Service
  </Text>{' '}
  and{' '}
  <Text
    style={styles.linkText}
    onPress={() =>
      Linking.openURL('https://wordpress-1394520-5503173.cloudwaysapps.com/')
    }
  >
    Privacy Policy
  </Text>
</Text>

            </View>

            <TouchableOpacity
              style={[
                styles.Button,
                {
                  backgroundColor:
                    phone.trim().length > 0 && isChecked ? '#FF402D' : '#FF402D80',
                },
              ]}
              disabled={phone.trim().length === 0 || !isChecked}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Text style={styles.Bottom}>
              Don't have an account{' '}
              <Text
                onPress={() => navigation.navigate('LoginNumberInputScreen')}
                style={{ fontWeight: 'bold', color: '#FF402D' }}
              >
                Login
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
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
  ButtonContainer: {},
  linkText: {
    fontFamily: 'Bold',
    color: '#FF402D',
  },
  
});
