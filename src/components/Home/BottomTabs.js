import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Icons
import Home from 'react-native-vector-icons/Octicons'; // home
import HomeActive from 'react-native-vector-icons/Foundation'; // home
import Search from 'react-native-vector-icons/Ionicons';  // search
import SearchActive from 'react-native-vector-icons/Ionicons'; // search-outline
import User from 'react-native-vector-icons/FontAwesome5'; // user-circle
import Add from 'react-native-vector-icons/Octicons'; //diff-added
import AddActive from 'react-native-vector-icons/MaterialIcons'; // add-box
import Movie from 'react-native-vector-icons/MaterialCommunityIcons'; //movie-open-play-outline
import MovieActive from 'react-native-vector-icons/MaterialCommunityIcons'; //movie-open-play
import { Divider } from 'react-native-elements';

const BottomTabs = ({navigation,active}) => {
    const [activeTab, setActiveTab] = useState(active);
  

    const icons = [
      {
        name: "Home",
        active: <Home name="home" style={styles.activeIcons} size={30} />,
        inactive: <Home name="home" style={styles.icons} size={30} />,
      },
      {
        name: "Search",
        active: (
          <SearchActive name="search" style={styles.activeIcons} size={30} />
        ),
        inactive: <SearchActive name="search" style={styles.icons} size={30} />,
      },
      {
        name: "Add",
        active: <Add name="diff-added" style={styles.activeIcons} size={30} />,
        inactive: <Add name="diff-added" style={styles.icons} size={30} />,
      },
      {
        name: "Movie",
        active: (
         <Movie name="movie-open-play-outline" style={styles.activeIcons} size={30} />
        ),
        inactive: <Movie name="movie-open-play-outline" style={styles.icons} size={30} />,
      },
      {
        name: "User",
        active: <User name="user-circle" style={styles.activeIcons} size={30} />,
        inactive: <User name="user-circle" style={styles.icons} size={30} />,
      },
    ];

   
  const handleNavigation = (icon) => {
  
  switch (icon.name) {
    case 'Add' :
    navigation.push('NewPostScreen')
    break;
    case 'Search':
    navigation.push('SearchScreen')
    break;
    case 'User':
    navigation.push('UserScreen')
    break;
    case 'Movie':
    navigation.push('Reels')
    break;

    default:
      break;
  }
  setActiveTab(icon.name)

}
    return (
      <>
        <Divider width={6} orientation='vertical' />
        <View style={styles.container} >
            {icons.map((icon, index) => (
              <View key={index}>
                    <TouchableOpacity onPress={() => handleNavigation(icon)}>
                        {activeTab === icon.name ? icon.active : icon.inactive}
                    </TouchableOpacity>
                </View>
            ))}
        </View>
            </>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height:45,
    borderWidth: 2,
    backgroundColor:'black',
    borderTopStartRadius:5,
    paddingTop:6
  },
  icons: {
    height: 30,
    width: 30,
    color: "white",
    opacity:0.3
  },
  activeIcons: {
    height: 30,
    width: 30,
    color: "white",
    fontWeight:'bold'
  },
});

export default BottomTabs;
