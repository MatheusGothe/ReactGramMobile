import { View, Text, Image, StyleSheet, Keyboard,Button,Animated, TouchableOpacity, Pressable, Alert } from 'react-native'
import React from 'react'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AnimatedTextInput from '../components/AnimatedTextInput'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../lib/firebase'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { Register } from '../services/userService'
import { useStore } from '../zustand/useStore'


//require("../../src/assets/reactgram.png")
const logo = '../../src/assets/reactgram.png'

const SignUpScreen = ({navigation}) => {

  const [user, setUser, loading, setLoading] = useStore((state) => [
    state.userAuth,
    state.setUser,
    state.loading,
    state.setLoading,
  ]);


  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An e-mail is required'),
    username: Yup.string().required().min(2,'A username is required'),
    password: Yup.string().required().min(8,'Your password has to have at least 8 characters'),
    confirmPassword: Yup.string()
       .oneOf([Yup.ref('password'), null], 'Passwords must match')
       .required('Confirm Password is required')
})


// Register a user and sign in
const register = async(user) => {

  setLoading(true)
  try {
    
    const res = await Register(user)
    console.log(res)
    setUser(res)
    navigation.reset({
      index:0,
      routes: [{name:'Home'}]
    })
  } catch (error) {

    console.log(error)
    Alert.alert(error.message)

  }

  setLoading(false)

}




  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/reactgram.png")}
              style={{ width: 100, height: 100, zIndex: 2 }}
            />
          </View>
          <Formik
            initialValues={{ email: "", password: "" ,confirmPassword: "",username:''}}
            onSubmit={(values) => register(values)}
            validationSchema={SignUpFormSchema}
            validateOnMount={true}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
              <View style={styles.wrapper}>
                <View
                  style={[
                    styles.inputField,
                    {
                      borderColor:
                        values.username.length > 2 || values.username.length < 1
                          ? "#CCC"
                          : "red",
                    },
                  ]}
                >
                  <AnimatedTextInput
                    type="username"
                    placeholder={"Username"}
                    secure={false}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    
                  />
                </View>
                <View
                  style={[
                    styles.inputField,
                    {
                      borderColor:
                        values.email.length < 1 ||
                        Validator.validate(values.email)
                          ? "#CCC"
                          : "red",
                    },
                  ]}
                >
                  <AnimatedTextInput
                    type="emailAddress"
                    placeholder={"e-mail"}
                    secure={false}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyBoardType={"email-address"}
                    autoComplete="email"
                  />
                </View>
                <View
                  style={[
                    styles.inputField,
                    {
                      borderColor:
                        1 > values.password.length || values.password.length > 7
                          ? "#CCC"
                          : "red",
                    },
                  ]}
                >
                  <AnimatedTextInput
                    type="password"
                    placeholder={"Password"}
                    secure={true}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                </View>
                <View
                  style={[
                    styles.inputField,
                    {
                      borderColor:
                        values.password === values.confirmPassword || values.confirmPassword === ''
                          ? "#CCC"
                          : "red",
                    },
                  ]}
                >
                  <AnimatedTextInput
                    type="password"
                    placeholder={"ConfirmPassword"}
                    secure={true}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                  />
                </View>
                <TouchableWithoutFeedback
                  style={styles.button(isValid)}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableWithoutFeedback>
              </View>
            )}
          </Formik>
          <View style={styles.signUpContainer}>
            <Text>Already have an account?</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('LoginScreen')}  >
              <Text style={{ color: "#6bb0f5" }}>Log In</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        paddingTop:50,
        paddingHorizontal:12,
    },
    logoContainer: {
        alignItems:'center',
        marginTop:60
    },
    inputField: {
        borderRadius:4,
        padding:5,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1
    },
    wrapper: {
        marginTop:80
    },
    button: (isValid) => ({
        backgroundColor: isValid ? "#0096F6": '#9ACAF7',
        alignItems:'center',
        justifyContent:'center',
        minHeight:42,
        borderRadius:4,
        marginTop:15
    }),
    buttonText: {
        fontWeight:600,
        fontSize:16,
        color:'#fff'
    },
    signUpContainer: {
        flexDirection:'row',
        width:'100%',
        justifyContent: 'center',
        marginTop:50
    }
})

export default SignUpScreen