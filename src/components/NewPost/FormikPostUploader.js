import { Image, StyleSheet, Text, TextInput, View, Button, TouchableWithoutFeedback, Keyboard, ScrollView, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {  Divider } from 'react-native-elements'
import BottomTabs from '../Home/BottomTabs'
import validUrl from 'valid-url'
import * as ImagePicker from 'expo-image-picker'

const placeHolderImage = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'

const uploadPostScheme = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  photoTitle: Yup.string().max(100, "Caption has reacher the character"),
});

const FormikPostUploader = ({navigation}) => {
    const [thumbNnailUrl,setThumbNailUrl] = useState('')
    const [imageUri,setImageUri] = useState(null)
    const [title,setTitle] = useState('')

    const handleSubmit = (values) => {
      console.log('teste')
    //  navigation.goBack()
    }

    const selectImage = async () => {

      // Solicitar permissão para acessar a galeria
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(status)
      if (status !== 'granted') {
        Alert.alert('Permissão Necessária', 'Precisamos da permissão para acessar a galeria!');
        return;
      }
  
      // Abrir a galeria de imagens
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        base64: true,
        quality: 1,
      });
  
      if(!result.canceled) {
        setThumbNailUrl(result.assets[0].uri);
      }
    };

    const takePicture = async() => {

      const {status} = await ImagePicker.requestCameraPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Permissão Necessária', 'Precisamos da permissão para acessar a galeria!');
        return;
      }
      
      const result = await ImagePicker.launchCameraAsync({
        quality:1
        
      })

      if(!result.canceled){
        setThumbNailUrl(result.assets[0].uri)
      }


    }



  return (
    // <DismissKeyboard style={{height:'100%',width:'100%',}}>
    <>
    <DismissKeyboard>
    <Formik
      initialValues={{ caption: "", photoTitle: "" }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={uploadPostScheme}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
          <>
            <View  style={{margin:20,justifyContent:'space-between',flexDirection:'row'}} >
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: validUrl.isUri(thumbNnailUrl) ? thumbNnailUrl : placeHolderImage}}
              />
              <Button title='Selecionar imagem' onPress={() => selectImage()} />
              <Button title='Tirar foto' onPress={takePicture} />
              {/* <View style={{flex:1,marginLeft:12}} >
              <TextInput
                style={{color:'white',fontSize:20}}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
                />
                </View> */}
               </View>
               <Divider width={0.2} orientation='vertical' />
              <TextInput
                onChange={(e) => setTitle(e.nativeEvent.text)}
                style={{color:'white',fontSize:18}}
                placeholder="Enter image title"
                placeholderTextColor="gray"
                // onChangeText={handleChange('imageUrl')}
                // onBlur={handleBlur('imageUrl')}
                value={title}
              />
              {errors.photoTitle && values.imageUrl.length > 0 && (
                  <Text style={{fontSize:10,color:'red'}}>
                      {errors.photoTitle}
                  </Text>
              )}
              <Button onPress={handleSubmit} title={'Share'} disabled={!isValid} />
          </>
      )}
    </Formik>
    </DismissKeyboard>
    </>
  );
}

export default FormikPostUploader

const DismissKeyboard = ({children}) => {
    return (
        <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss()}>
            <View style={{width:'100%',height:"90%"}}>
            {children}
        </View>
        {/* {children} */}
        </TouchableWithoutFeedback>
    )
}

