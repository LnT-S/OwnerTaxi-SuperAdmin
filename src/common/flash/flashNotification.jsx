import { showMessage } from "react-native-flash-message"
import { View , Image } from "react-native"
export const showNoty = (message , type , description)=>{
    return showMessage({
        message : message,
        description : description,
        type : type,
        hideStatusBar : true,
        statusBarHeight : 100,
        floating:true,
        autoHide : true,
        duration : 1500,
        position :'top',
        style : {display : 'flex' , justifyContent: 'center',alignItems: 'center', gap : 10},
        textProps : {style :{fontSize : 20 , color : 'white' , fontFamily : 'serif'}},
        icon : ()=><View style={{ height: 60, width: 55, position : 'relative' , top : -5}}><Image resizeMode='contain' source={require('../../assets/imgaes/Taxilogo.png')} style={{ height: '100%', width: '100%' }} /></View>
        // animationDuration : 50
    })
}