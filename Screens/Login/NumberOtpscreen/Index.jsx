import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import OTPImg from '../../../assets/images/Confirmed.svg';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from 'react-native'; // Add this at the top
import { useNavigation } from '@react-navigation/native';

const OTPInput = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputs = useRef([]);

  useEffect(() => {
    // Auto-focus the first input on mount
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  
    if (text) {
      if (index < 4) {
        inputs.current[index + 1].focus();
      } else {
        Keyboard.dismiss();
      }
    }
  };
  
  
  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] === '') {
        if (index > 0) {
          newOtp[index - 1] = '';
          setOtp(newOtp);
          inputs.current[index - 1].focus();
        }
      } else {
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    if (isOtpComplete) {
      console.log('Entered OTP:', enteredOtp);
      try {
        navigation.navigate('MainApp');
        console.log('Navigation triggered');
      } catch (e) {
        console.log('Navigation error:', e);
      }
    } else {
      console.log('Please enter all 5 digits of the OTP.');
    }
  };
  
  

  const [seconds, setSeconds] = useState(10);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;

    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => clearTimeout(timer);
  }, [seconds]);

  const handleResend = () => {
    if (canResend) {
      setSeconds(10); // reset timer
      setCanResend(false);
      // TODO: call resend OTP API here
    }
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
        <View style={styles.container}>
          <OTPImg style={styles.HomeImg} height={275} />
          <Text style={styles.GreyText}>Phone verification</Text>
          <Text style={styles.heading}>Enter your OTP code</Text>
          <View style={styles.InputContainer}>
            {otp.map((digit, index) => (
             <TextInput
             key={index}
             style={[
               styles.input,
               digit !== '' && styles.inputWithValue,
             ]}
             keyboardType="number-pad"
             maxLength={1}
             value={digit}
             onChangeText={(text) => handleChange(text, index)}
             onKeyPress={(e) => handleKeyPress(e, index)}
             ref={(ref) => (inputs.current[index] = ref)}
             returnKeyType="done"
             blurOnSubmit={false}
             onSubmitEditing={() => {
               if (index === 4) Keyboard.dismiss();
             }}
           />
           
            ))}
          </View>
          <View style={styles.ResendContainer}>
            <TouchableOpacity onPress={handleResend} disabled={!canResend}>
              <Text style={styles.resendText}>
                {canResend ? (
                  <Text style={styles.resendNow}>Resend Code</Text>
                ) : (
                  <>Resend Code in <Text style={styles.seconds}>{seconds} seconds</Text></>
                )}
              </Text>
            </TouchableOpacity>

            <Pressable>
  <TouchableOpacity
    style={[
      styles.NextButton,
      { backgroundColor: isOtpComplete ? '#FF402D' : '#FF402D80' },
    ]}
    disabled={!isOtpComplete}
    onPress={handleSubmit}
  >
    <Ionicons name="arrow-forward" size={20} color="white" />
  </TouchableOpacity>
</Pressable>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'column',
    marginTop: 39,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C2C2C2',
    borderRadius: 8,
    width: 58,
    height: 58,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginHorizontal: 8,
  },
  inputWithValue: {
    borderColor: '#FF402D',
  },
  InputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    alignSelf: 'center',
  },
  heading: {
    fontFamily: 'Bold',
    fontSize: 28,
    color: '#FF402D',
    marginTop: 10,
  },
  GreyText: {
    fontFamily: 'Regular',
    fontSize: 14,
    marginTop: 70,
    color: '#203052',
  },
  ResendContainer: {
    marginTop: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  resendText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  seconds: {
    color: '#FF3E3E',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  resendNow: {
    color: '#FF3E3E',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  NextButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF402D',
  },
  HomeImg: {
    alignSelf: 'center',
  },
});
