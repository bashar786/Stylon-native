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
  Alert,
  Keyboard,
} from 'react-native';
import OTPImg from '../../../assets/images/Confirmed.svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OTPInput = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputs = useRef([]);

  const [seconds, setSeconds] = useState(10);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      handleSubmit();
    }
  }, [otp]);

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];

    // Paste support: if user pastes entire OTP
    if (text.length > 1) {
      const pasted = text.split('').slice(0, 5);
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i];
      }
      setOtp(newOtp);
      inputs.current[Math.min(pasted.length - 1, 4)]?.focus();
      return;
    }

    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 4) {
      inputs.current[index + 1]?.focus();
    } else if (index === 4) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] === '') {
        if (index > 0) {
          newOtp[index - 1] = '';
          setOtp(newOtp);
          inputs.current[index - 1]?.focus();
        }
      } else {
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    if (otp.every((digit) => digit !== '')) {
      console.log('Entered OTP:', enteredOtp);
      navigation.navigate('SaloonInfoScreen');
    }
  };

  const handleResend = () => {
    if (canResend) {
      setSeconds(10);
      setCanResend(false);
      // TODO: Trigger resend OTP API
    }
  };

  const confirmGoBack = () => {
    Alert.alert(
      'Are you sure?',
      'This will cancel your verification process.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => navigation.goBack() },
      ]
    );
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
          {/* Back Button */}
          <TouchableOpacity onPress={confirmGoBack} style={{ marginTop: 30 }}>
            <Ionicons name="arrow-back" size={30} color="#FF402D" />
          </TouchableOpacity>

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
                onFocus={() => {
                  const newOtp = [...otp];
                  newOtp[index] = '';
                  setOtp(newOtp);
                }}
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
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
                  {
                    backgroundColor: otp.every((digit) => digit !== '')
                      ? '#FF402D'
                      : '#FF402D80',
                  },
                ]}
                disabled={!otp.every((digit) => digit !== '')}
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
