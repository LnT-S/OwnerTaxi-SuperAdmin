import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import CroppedImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PressButton from './PressButton';
import { getResponsiveValue } from '../../styles/responsive';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { imagePicker } from '../../utils/UtilityFuntions';

const InvertedPersonInfoSemicircle = (props) => {

  const { image, name, phoneNumber, email } = props.item
  const editMode = props.editMode

  const [selectedImage, setSelectedImage] = useState(image)

  useEffect(() => {
    console.log('SELECTED IMAGE IS ', selectedImage?.uri)
  }, [selectedImage])

  const handleChange = (v) => {
    console.log(v)
  }
  return (
    <View style={styles.container}>
      <View style={styles.semicircle}>
        <View style={styles.imageContainer}>
          <Image
            source={(selectedImage === '' || selectedImage === undefined || selectedImage === null) ?
              require('../../assets/imgaes/Profile.png') :
              { uri: selectedImage.uri }
            }
            style={styles.image}
          />
          {editMode ? (<TouchableOpacity onPress={async () => {
            imagePicker('Select Profile Image', 'photo', true, false, true, true)
            .then(image=>{
              image!==null ? setSelectedImage(image) : ''
            })
            .catch(err=>{
              console.log('ERROR IN IMAGE PICK',err)
            })
          }}>
            <Icon name="edit" size={24} color="#ffea00" style={styles.imageEditIcon} />
          </TouchableOpacity>) : ("")}
        </View>

        {editMode ? (
          <TextInput
            style={styles.editableField}
            onChangeText={(v) => { handleChange(v) }}
            placeholder={name ? name : 'Enter your User Name'}
            placeholderTextColor="gray"
          />) :
          (name === "" || name === undefined) ?
            '' :
            (<Text style={styles.name}>{name}</Text>)
        }

        {editMode ? (
          <TextInput
            style={styles.editableField}
            onChangeText={(v) => { handleChange(v) }}
            placeholder={email ? email : 'Enter your email'}
            placeholderTextColor="gray"
          />) :
          (email === "" || email === undefined) ?
            '' :
            (<Text style={styles.name}>{email}</Text>)
        }
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      <PressButton name="Save" />
      {editMode ? <View style={styles.saveButton}>
      </View> : ''}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30, // Adjust as needed
  },
  saveButton: {
    position: 'absolute',
    bottom: -30,
    left: '35%'
  },
  semicircle: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  phoneNumber: {
    fontSize: 16,
    color: 'white'
  },
  imageContainer: {
    position: 'relative'
  },
  imageEditIcon: {
    position: 'absolute',
    bottom: 15,
    right: 1,
  },
  editableField: {
    color: 'white',
    fontSize: getResponsiveValue(20, 16),
    // marginTop: getResponsiveValue(0, 0),
    // marginBottom: getResponsiveValue(5, 5),
    fontWeight: 'bold',
    borderBottomColor: '#ffea00',
    borderBottomWidth: 1,
    width: '70%',
    textAlign: 'center',
    position: 'relative',
    bottom: getResponsiveValue(5, 5),
  },
});

export default InvertedPersonInfoSemicircle;
