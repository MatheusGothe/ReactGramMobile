import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

// Icons
import AddIcon from 'react-native-vector-icons/AntDesign';
import HeartIcon from 'react-native-vector-icons/FontAwesome'
import MessagerIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Svg,{Path} from 'react-native-svg'

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={{color:'white',fontSize:20}} >
        ℜ𝔢𝔞𝔠𝔱𝔤𝔯𝔞𝔪
        </Text>
      </TouchableOpacity>
      {/* //   InstagramClone\src\assets\MessegerIcon.svg */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <HeartIcon style={styles.icon} name="heart-o" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
        <MessagerIcon style={styles.icon} name='facebook-messenger' size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
  container: {
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginHorizontal:20,
  },
  iconsContainer: {
    flexDirection:'row',
  },

  logo: {
    width:100,
    height:50,
    resizeMode:'contain'  
  },

  icon: {
    width:30,
    height:30,
    marginLeft:10,
    color:'white',
  },
  unreadBadge: {
    backgroundColor:'#FF3250',
    position:'absolute',
    left:20,
    bottom:18,
    width:25,
    height:18,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',  
    zIndex:2
  },
  unreadBadgeText: {
    color:'white',
    fontWeight:600
  }
})