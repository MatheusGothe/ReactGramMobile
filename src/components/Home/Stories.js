import { View, Text, ScrollView, Image,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUsersStories } from '../../../Data/users'
import { LinearGradient } from 'expo-linear-gradient';


const Stories = () => {

    const [userStories,setUserStories] = useState([])
    const [loading,setLoading] = useState(false)

    
    useEffect(() => {
        const fetchUserStories = async() => {
            setLoading(true)
            const stories = await getUsersStories()
            setUserStories(stories)
            setLoading(false)
          }
          fetchUserStories()
    },[])




  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 3 }}
      >
        {loading && (
          <Text style={{ width: 100, color: "white", height: 100 }}>
            Loading...
          </Text>
        )}
        {userStories.users &&
          userStories.users.map((story, index) => (
            <View key={index}>
              <LinearGradient
                colors={["#D91FCD", "#FF9300"]}
                style={styles.gradientBorder}
              >
                <Image
                  source={{
                    uri: story.image,
                  }}
                  style={styles.story}
                />
              </LinearGradient>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white",fontSize:10.5 }}>
                  {" "}
                  {story.username.length > 16
                    ? story.username.slice(0, 10).toLowerCase() + "..."
                    : story.username}{" "}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    gradientBorder: {
        width: 76,
        height: 76,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
      },
    story: {
        width:70,
        height:70,
        borderRadius:50,
        borderWidth:2,
        backgroundColor:'black', // Adicione esta linha
        marginLeft:3,
        marginRight:3,    
    }
})


export default Stories