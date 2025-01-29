import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Image, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useCameraStore } from '@/presentation/store/useCameraStore';
import * as ImagePicker from 'expo-image-picker';

const cameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  const [selectedImage, setSelectedImage] = useState<string>('')
  const cameraRef = useRef<CameraView>(null)

  const { selectedImages, addSelectedImage, clearImages} = useCameraStore()

  const onRequestPermission = async () =>{

   try {
      const {status:cameraPermissionStatus } = await  requestCameraPermission()
      if (cameraPermissionStatus !== 'granted') {
        Alert.alert("Lo siento", "Necesitamos permiso a la camara para tomar fotos")
        return;
      }

      const {status:mediaPermissionStatus } = await  requestMediaPermission()
      if (mediaPermissionStatus !== 'granted') {
        Alert.alert("Lo siento", "Necesitamos permiso a la camara para tomar fotos")
        return;
      }
   } catch (error) {
    console.log(error)
    Alert.alert("Error", "Algo salio mal con los permisos")
    return;
   }
  }

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }
  

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{
        ...styles.container,
        marginHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
}}>
        <Text style={styles.message}>Necesitamos permisos para usar la camara y la galeria</Text>
        <TouchableOpacity onPress={onRequestPermission} >
            <ThemedText style={styles.text}>Solicitar permisos</ThemedText>
            </TouchableOpacity>
      </View>
    );
  }

  const onShutterButtonPress = async () => {
    if (!cameraRef.current)return;

    const picture = await cameraRef.current.takePictureAsync({
        quality:0.7
    })

    console.log(picture)

    if (!picture?.uri) return;

    setSelectedImage(picture.uri)
  }

  const onReturnCancel = () => {

    router.dismiss()
  }

  const onPictureAccepted = async () => {

    if (!selectedImage) return;
    await MediaLibrary.createAssetAsync(selectedImage)
    addSelectedImage(selectedImage)
    router.dismiss()
  }

  const onRetakePhoto = () => {
    setSelectedImage('')
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const onPickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }
  if (selectedImage) {
    return (
        <View style={styles.container}>
              <Image  source={{ uri: selectedImage }} style={styles.camera} />
              <ReturnCancelButton onPress={onReturnCancel}></ReturnCancelButton>
              <ConfirmImageButton onPress={onPictureAccepted}></ConfirmImageButton>
              <RetakeImageButton onPress={onRetakePhoto}/>
        </View>
      );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <FlipCameraButton onPress={toggleCameraFacing}></FlipCameraButton>
          <ShutterButton onPress={onShutterButtonPress}></ShutterButton>
          <GalleryButton onPress={() => {}}></GalleryButton>
          <ReturnCancelButton onPress={onReturnCancel}></ReturnCancelButton>
          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <ThemedText style={styles.text}>Flip Camera</ThemedText>
          </TouchableOpacity> */}
    
      </CameraView>
    </View>
  );
}

export default cameraScreen

//Custom Components
const ShutterButton = ({ onPress = () => {}}) => {
    const dimensions = useWindowDimensions();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.shutterButton, { position:'absolute', bottom:30, left: dimensions.width /2 -32}]}>
      <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'white' }} />
    </TouchableOpacity>
  );
}

//Custom Components
const ConfirmImageButton = ({ onPress = () => {}}) => {
    const dimensions = useWindowDimensions();
    const primary = useThemeColor({ }, 'primary')
  return (
    <TouchableOpacity onPress={onPress} style={[styles.shutterButton, { position:'absolute', bottom:30, left: dimensions.width /2 -32}]}>
      <Ionicons name='checkmark-outline' size={30} color={primary}></Ionicons>
    </TouchableOpacity>
  );
}

const FlipCameraButton = ({ onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name='camera-reverse-outline' color={'#fff'} size={30}></Ionicons>
    </TouchableOpacity>
  );
}

const GalleryButton = ({ onPress = () => {}}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
        <Ionicons name='images-outline' color={'#fff'} size={30}></Ionicons>
      </TouchableOpacity>
    );
  }
  const ReturnCancelButton = ({ onPress = () => {}}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.returnCancelButton}>
        <Ionicons name='arrow-back-outline' color={'#fff'} size={30}></Ionicons>
      </TouchableOpacity>
    );
  }

  const RetakeImageButton = ({ onPress = () => {}}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
        <Ionicons name='close-outline' color={'#fff'} size={30}></Ionicons>
      </TouchableOpacity>
    );
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  
    shutterButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: 'white',
      //borderColor: 'red',
      borderWidth: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    flipCameraButton: {
      width: 50,
      height: 50,
      borderRadius: 32,
      backgroundColor: '#17202A',
      position: 'absolute',
      bottom: 40,
      right: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    galleryButton: {
      width: 50,
      height: 50,
      borderRadius: 32,
      backgroundColor: '#17202A',
      position: 'absolute',
      bottom: 40,
      left: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    returnCancelButton: {
      width: 50,
      height: 50,
      borderRadius: 32,
      backgroundColor: '#17202A',
      position: 'absolute',
      top: 40,
      left: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });