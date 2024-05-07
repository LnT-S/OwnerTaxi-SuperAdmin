import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout'
import Semicircle from '../../adOns/atoms/SemiCircle'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import YesNoModal from '../../adOns/molecules/YesNoModal';

const Profile = () => {

  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const profileDetails = {
    image: '',
    name: 'Shruti Mishra',
    phoneNumber: '1234567891',
    email: 'smsihra.ninja9252@gmail.com'
  }
  const handleShow = () => {
    setShowModal(false);
  };

  return (
    <AuthenticatedLayout title={'Profile'}>
      <YesNoModal
        show={showModal}
        setShow={setShowModal}
        title={'Show ?'}
        message={'Show my info to Customer'}
        handleYes={handleShow}
        yesText={'Hide'}
        noText={'Show'} />
      <Semicircle item={profileDetails} editMode={true} />
      <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <View style={styles.settingBox}>
          <TouchableOpacity style={styles.listItem1} onPress={() => setShowModal(true)}>
            <Icon name="visibility" size={30} color="#ffea00" />
            <Text style={styles.text}>Show My Name To Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem1} onPress={() => setShowModal(true)}>
            <Icon name="visibility" size={30} color="#ffea00" />
            <Text style={styles.text}>Show My Email ID To Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem2} onPress={() => setShowModal(true)}>
            <Icon name="visibility" size={30} color="#ffea00" />
            <Text style={styles.text}>Show My Profile Image To Customer</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ width: '100%' }}>
          <Text style={styles.textStyle}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </AuthenticatedLayout>
  )
}
const styles = StyleSheet.create({
  settingBox: {
    backgroundColor: 'black',
    marginHorizontal: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  listItem1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffea00',
    marginLeft: 0,
    padding: 5
  },
  text: {
    color: '#ffea00',
    fontSize: 18,
    marginLeft: 10
  },
  listItem2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    padding: 5
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    padding: 5,
    textDecorationLine: 'underline'
  }
})
export default Profile