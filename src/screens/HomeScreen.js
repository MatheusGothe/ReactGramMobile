import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Home/Header'
import Stories from '../components/Home/Stories'
import Post from '../components/Home/Post'
import { getPosts } from '../../Data/posts'
import BottomTabs from '../components/Home/BottomTabs'

import { getPhotos } from '../services/postService'
import { usePostStore } from '../zustand/usePostStore'
import { useStore } from '../zustand/useStore'
import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { set } from 'firebase/database'

const HomeScreen = ({navigation}) => {

  const [loadingUpdatedPosts, setLoadingUpdatedPosts] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [canUpdate,setCanUpdate] = useState(true)
  
  const { posts, setPosts, loading, setLoading } = usePostStore((state) => ({
    posts: state.post,
    setPosts: state.setPosts,
    loading: state.loading,
    setLoading: state.setLoading,
  }));

  const userAuth = useStore(state => state.userAuth)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Ativar loading inicial
        const res = await getPhotos(userAuth);
        setPosts(res.photos);
        setAnimate(true);
        setLoading(false); // Desativar loading inicial após o término da operação
      } catch (error) {
        console.log(error);
      } 
    };
    fetchPosts();
    setAnimate(false)
  }, []);

  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;

    if (scrollPosition < -100) {
      updatePosts();
    }
  };

 
  
  const updatePosts = async () => {
    setCanUpdate(false)

    setLoadingUpdatedPosts(true); // Ativar loading de atualização de posts
    try {
      const res = await getPhotos(userAuth);
      setPosts(res.photos);
      setLoadingUpdatedPosts(false); // Desativar loading de atualização de posts após o término da operação
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    } 

    setCanUpdate(true)
  };
  

  
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView onScroll={ canUpdate ? handleScroll : ''} scrollEventThrottle={100}>
      <Stories />
        {posts &&
          posts.map((post, index) => (
            <Animatable.View key={index} animation={animate ? "fadeInUp" : ''} duration={1500} useNativeDriver>
               {loadingUpdatedPosts && (
          <LottieView
            source={require("../assets/loadAnimation.json")}
            style={{
              width: 80,
              height: 80,
              alignSelf: "center",
            }}
            autoPlay
            speed={0.5}
          />
        )}
              <Post post={post} />
            </Animatable.View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'black',
    flex:1,
  }
});

export default HomeScreen;
