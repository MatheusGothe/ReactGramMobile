import { View, Text, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import React, { useState } from 'react'
import Arrow from 'react-native-vector-icons/MaterialIcons'
import Arrow2 from 'react-native-vector-icons/SimpleLineIcons'
import FormikPostUploader from './FormikPostUploader'
import BottomTabs from '../Home/BottomTabs'

const AddNewPost = ({navigation}) => {

  return (
    <View>
    <Header navigation={navigation}/>
    <FormikPostUploader navigation={navigation} />

    </View>
  )
}

const Header = ({navigation}) => (
  <View style={styles.headerContainer}>
  <TouchableOpacity onPress={() => {
    navigation.goBack()
  }
    } >
  <Arrow name='arrow-back-ios' size={30} color={'white'} />
  </TouchableOpacity>
  <Text style={styles.headerText}>New Post</Text>
  <Text></Text>
</View>
)

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10
  },
  headerContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  headerText: {
    color:'#FFF',
    fontWeight:700,
    fontSize:20,
    marginRight:25
  }
})

export default AddNewPost