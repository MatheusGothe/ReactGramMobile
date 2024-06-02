import { View, Text, Image, StyleSheet, Keyboard,Button,Animated, TouchableOpacity, Pressable,Alert } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AnimatedTextInput from '../components/AnimatedTextInput'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../lib/firebase'
import { Login } from '../services/userService'
import { useStore } from '../zustand/useStore'



//require("../../src/assets/reactgram.png")
const logo = '../../src/assets/reactgram.png'

const LoginScreen = ({navigation}) => {


  const [setUser,loading,setLoading] = useStore(state => [state.setUser,state.loading,state.setLoading])
  
  const userAuth = auth.currentUser


  const LoginFormSchema = Yup.object().shape({
    email:Yup.string().email().required('An e-mail is required'),
    password:Yup.string().required().min(6,'Your password has to have at least 6 characters')
  })




  const login = async(email,password) => {
    setLoading(true)
    const data = {email,password}
    
    try {

      const res =  await Login(data)
      setUser(res.user)
      navigation.reset({
        index:0,
        routes:[{name:'Home'}]
      })
    } catch (error) {
      console.log(error)
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
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => login(values.email,values.password)}
            validationSchema={LoginFormSchema}
            validateOnMount={true}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
              <View style={styles.wrapper}>
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
                    placeholder={"Phone number, username or e-mail"}
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
                        1 > values.password.length || values.password.length >= 6
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
                <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
                <TouchableWithoutFeedback onPress={() => navigation.push("ResetPassword")} >
                  <Text style={{ color: "#6bb0f5" }}>Forgot password?</Text>
                </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback
                  disabled={loading}
                  style={styles.button(isValid)}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Log In</Text>
                </TouchableWithoutFeedback>
              </View>
            )}
          </Formik>
          <View style={styles.signUpContainer}>
            <Text>Don't have an account?</Text>
            <TouchableWithoutFeedback  onPress={() => navigation.push('SignUpScreen')} >
              <Text style={{ color: "#6bb0f5" }}>Sign Up</Text>
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
        borderRadius:4
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

export default LoginScreen