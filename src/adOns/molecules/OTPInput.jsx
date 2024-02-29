import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ length, onOTPChange }) => {
  const [otp, setOTP] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    onOTPChange(newOTP.join(''));

    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length).fill().map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          onChangeText={(value) => handleOTPChange(index, value)}
          value={otp[index]}
          maxLength={1}
          keyboardType="numeric"
          selectTextOnFocus
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%'
  },
  input: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 2,
  },
});

export default OTPInput;
