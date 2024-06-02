import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import LoginScreen from './screens/LoginScreen'
import SignUp from './screens/SignUpScreen'
import ResetPassword from './screens/ResetPassword'
import { auth } from './lib/firebase'
import SearchScreen from './screens/SearchScreen'
import Reels from './screens/Reels'
import UserScreen from './screens/UserScreen'
import Home from 'react-native-vector-icons/Octicons'; // home
import Search from 'react-native-vector-icons/Ionicons';  // search
import User from 'react-native-vector-icons/FontAwesome5'; // user-circle
import Add from 'react-native-vector-icons/Octicons'; //diff-added
import Movie from 'react-native-vector-icons/MaterialCommunityIcons'; //movie-open-play-outline

import { useNavigation } from '@react-navigation/native'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useStore } from './zustand/useStore'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const screenOptions = {
  headerShown: false,
  animationEnabled:true
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let IconComponent;
let icon;

switch (route.name) {
  case 'HomeScreen':
    IconComponent = Home;
    icon = 'home';
    break;
  case 'SearchScreen':
    IconComponent = Search;
    icon = 'search';
    break;
  case 'NewPostScreen':
    IconComponent = Add;
    icon = 'diff-added';
    break;
  case 'Reels':
    IconComponent = Movie;
    icon = 'movie-open-play-outline';
    break;
  case 'UserScreen':
    IconComponent = User;
    icon = 'user-circle';
    break;
  default:

    break;
}
          // Você pode retornar qualquer componente que você gosta aqui!
          return <IconComponent name={icon} style={{ opacity: focused ? 1 : 0.4 }} size={30} color="#FFFFFF" />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: 'black',
          height:80
        },
        tabBarShowLabel:false,
        headerShown:false

      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
      <Tab.Screen
        name="NewPostScreen"
        component={NewPostScreen}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
      />
    </Tab.Navigator>
  );
}



const SignedInStack = () => {

  const { loading:isLoading,setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading
}));


  const userAuth = useStore(state => state.userAuth)
  const setUser = useStore(state => state.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(userAuth) => {
      setUser(auth.currentUser)
      setLoading(false)
    })
     setLoading(true)
        return () => unsubscribe();
  },[])

  if(isLoading){
    return <View>
      <Text>Loading</Text>
    </View>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ userAuth ? 'HomeScreen' : 'LoginScreen'}  screenOptions={screenOptions} >
        <Stack.Screen name='Home' component={TabNavigator} />
        <Stack.Screen name='NewPostScreen'  component={NewPostScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SignUpScreen' component={SignUp} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default SignedInStack
