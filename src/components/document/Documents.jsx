import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';
import MainDocumentCard from './MainDocumentCard.jsx'
import VehicleCard from './VehicleCard.jsx'
import { documentPicker } from '../../utils/UtilityFuntions';
import { getDocumentInfo } from '../../services/getDataServices'
import { useProfile } from '../../context/ContextProvider'
import { showNoty } from '../../common/flash/flashNotification'
import { WHITEBG, BgColor } from '../../styles/colors';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'

const Documents = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const props = route.params?.item
  const { profileState, profileDispatch } = useProfile()
  const [loading, setLoading] = useState(true)
  const [carSubArray, setCarSubArray] = useState([])
  const [driverArray, setDriverArray] = useState([...props?.userDocument])
  const [carArray, setCarArray] = useState([...props?.vehicle])
  const [vehicleNo, setVehicleNo] = useState('')
  const [progress, setProgress] = useState(0)

  const setArray = (item, index) => {
    console.log(item, index)
    setVehicleNo(item.vehicleNo)
    setCarSubArray(item.document)
  }
  useFocusEffect(
    useCallback(() => {
      setCarArray(props?.vehicle)
      setDriverArray([...props?.userDocument])
      setCarSubArray([])
    }, [route,props])
  )

  useEffect(() => {
    console.log("DOCUMENT INFO  ", props)
  }, [driverArray])
  useEffect(() => {
    const backFuntion = () => {
      navigation.goBack()
      return true
    }
    console.log("BACKHANDLER SET IN HOME PAGE")
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backFuntion);
    return () => {
      console.log('BACKHANDLER REMOVED FROM HOME PAGE')
      backHandler.remove()
    };
  }, []);

  return (
    <AuthenticatedLayout title={'Document'}>
      
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ backgroundColor: WHITEBG, width: '97%', borderRadius: 15 }}>
            <View style={{ ...styles.textContainer, flexDirection: 'row', justifyContent: 'space-between', }}>
              <Text style={styles.text}>Driver Documents</Text>
            </View>
            <View style={styles.document}>
              {driverArray?.map((item, index) => {
                return <MainDocumentCard item={item} key={index} user={props} setProgress={setProgress}/>
              })}
            </View>
          </View>
          <View style={{ backgroundColor: WHITEBG, marginTop: 10, width: '97%', borderRadius: 15 }}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Vehicle Documents</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.007)', alignItems: 'center', padding: 10 }}>
              {carSubArray.length > 0 && <TouchableOpacity onPress={() => setCarSubArray([])} style={{ ...styles.textContainer, borderWidth: 1, width: 180, justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 0, backgroundColor: 'black', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}><Text style={{ ...styles.text, fontWeight: 500, fontSize: 18, color: 'white' }}>Vehicle Info</Text></TouchableOpacity>}
            </View>
            <View style={styles.document}>
              {carSubArray.length === 0 && carArray !== undefined && (carArray.length > 0) && carArray.map((item, index) => {
                return <TouchableOpacity style={{ width: '100%' }} key={index} onPress={() => { setArray(item, index) }}><VehicleCard item={item} index={index + 1} /></TouchableOpacity>
              })}
              {
                (carSubArray.length > 0) && carSubArray.map((item, index) => {
                  return <MainDocumentCard item={item} key={index} vehicleNo={vehicleNo} user={props} setProgress={setProgress}/>
                })
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </AuthenticatedLayout>
  )
}
const styles = StyleSheet.create({

  document: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    width: '100%',
    gap: 15,
    marginBottom: 25,

  },
  textContainer: {
    height: 50,
    width: '100%',
    // margin: 5,
    marginBottom: 10,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  text: {
    fontSize: 26,
    fontWeight: '600',
    color: 'black'
  }
})
export default React.memo(Documents)