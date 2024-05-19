import DocumentPicker from 'react-native-document-picker';
import CroppedImagePicker from 'react-native-image-crop-picker';
import Clipboard from '@react-native-clipboard/clipboard';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';


type messageObject = {
    ts: Number,
    message: String,
    user: String
}

export const activeMessageArray = (selfUserArray: Array<messageObject>, otherUserArray: Array<messageObject>) => {
    let i = 0
    let j = 0

    let finalArray = []
    let index = 0

    let msgObject: messageObject

    for (; i < selfUserArray.length && j < otherUserArray.length; index++) {
        if (selfUserArray[i].ts >= otherUserArray[j].ts) {
            // console.log('0')
            msgObject = selfUserArray[i]
            msgObject.user = 'self'
            finalArray.push(msgObject)
            i++;
        }
        if (selfUserArray[i].ts < otherUserArray[j].ts) {
            // console.log('1')
            msgObject = otherUserArray[j]
            msgObject.user = 'other'
            finalArray.push(msgObject)
            j++;
        }
    }
    while (i < selfUserArray.length) {
        // console.log('2')
        msgObject = selfUserArray[i++]
        msgObject.user = 'self'
        finalArray.push(msgObject)
    }
    while (j < otherUserArray.length) {
        // console.log('3')
        msgObject = otherUserArray[j++]
        msgObject.user = 'other'
        finalArray.push(msgObject)
    }

    return finalArray;
}


export const documentPicker = async (documentName: String) => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
            allowMultiSelection: false
        });
        return { ...res[0], documentName: documentName }
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            console.log('USER CANCELLED PICKING DOCUMENT');
        } else {
            console.log('UNKNOWN ERROR IN DOCUMENT PICKER  ::', err);
        }
    }
}

export const imagePicker = async function (
    title: string,
    mediaType: 'video' | 'photo' | 'any',
    cropping: boolean | undefined,
    multiple: boolean,
    showCircle: boolean,
    freeStyle: boolean,
) {
    const response = await CroppedImagePicker.openPicker({
        mediaType: mediaType,
        cropping: cropping, // Enable cropping
        cropperCircleOverlay: showCircle, // Set to true if you want a circular crop overlay
        freeStyleCropEnabled: freeStyle, // Enable free-style cropping
        aspectRatio: [1, 1], // Set the aspect ratio for cropping (1:1 in this example)
        includeBase64: true,
        multiple: multiple, // Set to true if you want to allow multiple selection
        cropperToolbarTitle: title,
    });
    console.log('RESPONSE OF SELECTED IMAGE IS *****************************************\n', response.sourceURL, response.path)
    if (response.path !== undefined) {
        let selectedImage = {
            fileName: `OwerTaxi${new Date().getTime()}`,
            fileSize: 0,
            height: 0,
            type: "image/png",
            uri: '',
            width: 0,
            data: ''
        }

        selectedImage.fileSize = response.size,
            selectedImage.height = response.height,
            selectedImage.width = response.width,
            selectedImage.type = response.mime,
            selectedImage.uri = response.path
        return selectedImage
    } else {
        return null
    }


}

export const copyToClipboard = (text: string) => {
    try {
        Clipboard.setString(text)
        return true
    } catch (error) {
        console.log('ERROR COPYING TO CLIPBOARD', error)
        return false
    }
}
const getFileSize = async (filePath: string) => {
    try {
        const statResult = await RNFS.stat(filePath);
        return statResult.isFile() ? statResult.size : 0;
    } catch (error) {
        return 0;
    }
};
export const captureAndDownload = async (uri: string, setProgress: Function, phone: string, name: string | undefined) => {
    try {
        console.log('URI ', uri)
        const imageUrl = uri.replaceAll('\\', '/');
        console.log("URL ", imageUrl)
        const dir = RNFS.DownloadDirectoryPath;
        const fileName = `${name ? name + phone : phone}${new Date().getTime()}`;
        const filePath = `${dir}/${fileName}.jpg`;
        try {
            const fileSize = await getFileSize(filePath);
            const { promise } = RNFS.downloadFile({
                fromUrl: imageUrl,
                toFile: filePath,
                headers: {
                    Range: `bytes=${fileSize}-`,  // Request the range from the last downloaded byte
                },
                begin: (res) => {
                    console.log('Download has begun');
                },
                progress: (data) => {
                    const percentage = ((data.bytesWritten + fileSize) / (data.contentLength + fileSize)) * 100;
                    const totalBytesWritten = data.bytesWritten + fileSize;
                    const totalBytesExpected = data.contentLength + fileSize;
                    const percentag = totalBytesWritten / totalBytesExpected;
                    setProgress(percentag)
                    console.log(`Progress: ${percentage.toFixed(2)}%`);
                },
            });
            const result = await promise;
            if (result.statusCode === 200 || result.statusCode === 206) {
                Alert.alert('Download Success', 'Image downloaded successfully');
            } else {
                console.log("STATUS ", result.bytesWritten)
                Alert.alert('Download Failed', `Status Code: ${result.statusCode}`);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Download Failed');
        }
        // let info = await RNFS.copyFile(uri, filePath);
        // console.log("STATUS DOWNLOADED TO ", filePath);
        // return info
    } catch (error) {
        console.log('ERROR DOWNLOADING THE STATUS ', error)
    }
}