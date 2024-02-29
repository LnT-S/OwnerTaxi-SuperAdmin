import React, { useState } from "react";
import { StyleSheet, View, TextInput, Pressable, TouchableOpacity } from "react-native";
import { getResponsiveValue, screenWidth } from '../../styles/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PassInput = (props) => {
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const [passwordVisibility, setPasswordVisibility] = useState(true);

  return (
    <View style={styles.inputContainer}>
      <Icon name="lock" size={24} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="gray"
        secureTextEntry={passwordVisibility}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Icon
          name={passwordVisibility ? 'visibility' : 'visibility-off'}
          size={24}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: getResponsiveValue(500, screenWidth * 0.8),
    height: getResponsiveValue(70, 50),
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: `white`,
    marginBottom: getResponsiveValue(20, 10),
    color: 'black',
    borderColor: 'black',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize : 18
  },
});

export default PassInput;