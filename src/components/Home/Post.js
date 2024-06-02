import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Touchable,
  PushNotificationIOS,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

// Icons
import Heart from "react-native-vector-icons/AntDesign";
import Hearto from "react-native-vector-icons/AntDesign";
import Comment from "react-native-vector-icons/FontAwesome";
import Send from "react-native-vector-icons/Feather";
import BookMark from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import { deslike, like } from "../../services/postService";
import { useStore } from "../../zustand/useStore";
import { usePostStore } from "../../zustand/usePostStore";

// Animation
import LottieView from "lottie-react-native";

import LikeAnimation from "../../assets/likeAnimation.json";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const [posts, setPosts, setLike, removeLike] = usePostStore((state) => [
    state.post,
    state.setPosts,
    state.setLike,
    state.removeLike,
  ]);

  const user = useStore((state) => state.userAuth);

  const handleSetLiked = (value) => {
    setLiked(value);
  };

  const handleLike = () => {
    if (!post.likes.includes(user.uid)) {
      like(post);
      setLike(post, user);
    }

    setLiked(true);
    setTimeout(() => {
      setLiked(false);
    }, 2000);

    console.log("dar like");
  };

  const handleRemoveLike = () => {


    deslike(post.photoId);
    removeLike(post, user);
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} user={user} />
      <PostImage post={post} user={user} handleLike={handleLike} />
      <PostFooter
        post={post}
        user={user}
        handleLike={handleLike}
        handleRemoveLike={handleRemoveLike}
      />
      {liked && (
        <View style={{ position: "absolute", width: "100%", top: "25%" }}>
          <LottieView
            source={require("../../assets/likeAnimation.json")}
            style={{
              position: "absolute",
              width: 275,
              height: 275,
              margin: "0 auto",
              width: "100%",
            }}
            autoPlay
            speed={0.5}
          />
        </View>
      )}

      <Likes post={post} user={user} handleLike={handleLike} />
      <Caption post={post} />
      <CommentSection post={post} />
      <Comments post={post} />
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        alignContent: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <LinearGradient
          colors={["#D91FCD", "#FF9300"]}
          style={styles.gradientBorder}
        >
          {post && (
            <Image
              source={{ uri: post.user.profileImage }}
              style={styles.story}
            />
          )}
        </LinearGradient>
        <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
          {post.username}
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text style={{ color: "white", fontWeight: "900", fontSize: 20 }}>
            ...
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PostImage = ({ post, handleLike }) => {
  const [lastPress, setLastPress] = useState(0);
  const [liked, setLiked] = useState(false);
  const setLike = usePostStore((state) => state.setLike);
  const user = useStore((state) => state.userAuth);
  const [imageKey,setImageKey] = useState(post.photoUrl)

  const handlePress = () => {
    const currentTime = new Date().getTime();
    const doublePressDelay = 500; // Tempo em milissegundos para considerar como duplo clique

    if (currentTime - lastPress < doublePressDelay) {
      console.log("Duplo clique detectado!");
      //funcção de dar like

      handleLike();
    }

    setLastPress(currentTime);
  };

  const handleLoad = () => {
    console.log('terminou de carregar')
  }

  useEffect(() => {
    setImageKey(post.photoUrl)
  }, [imageKey])
  

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: 500 }}
    >
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ width: "100%", height: "100%" }}>
          <Image
            key={post.photoUrl}
            source={{ uri: post.photoUrl }}
            style={{ height: "100%", resizeMode: "cover", width: "100%" }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const PostFooter = ({ post, handleLike, user, handleRemoveLike }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          {user && post.likes && post.likes.includes(user.uid) ? (
            <TouchableOpacity onPress={handleRemoveLike}>
              <Heart
                name="heart"
                style={{ ...styles.footerIcon, color: "red" }}
                size={30}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLike}>
              <Heart name="hearto" style={styles.footerIcon} size={30} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity>
          <Comment name="comment-o" style={styles.footerIcon} size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="send-o" style={styles.footerIcon} size={30} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "flex-end", flex: 1 }}>
        <TouchableOpacity>
          <BookMark
            name="bookmark"
            style={{ width: 30, height: 30, color: "white" }}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Likes = ({ post }) => {

  return (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
      <Text style={{ color: 'white', fontWeight: '600' }}>
        {post.likes.length} {post.likes.length !== 1 ? 'likes' : 'like'}
      </Text>
    </View>
  );
};

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      <Text style={{ color: "white" }}>
        <Text style={{ fontWeight: 600 }}> {post.username} </Text>
        <Text> Que massa</Text>
      </Text>
    </View>
  );
};

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {/* { !!post.comments.length && ( */}
    <Text style={{ color: "gray" }}>
      View all 2 comments
      {/* {post.comments.length > 1 ? 'all' : ''} {post.comments.length} */}
      {/* {post.comments.length > 1 ? 'comments' : 'comment'} */}
    </Text>
    {/* )} */}
  </View>
);

const Comments = ({ post }) => (
  <>
    {/* {post.comments.map((comment,index) => ( */}
    <View style={{ flexDirection: "row", marginTop: 5 }}>
      <Text style={{ color: "white" }}>
        <Text style={{ fontWeight: 600 }}>
          {" "}
          {/*comment.user*/} Matheus Gothe
        </Text>
        <Text> {/*comment.comment*/} Top </Text>
      </Text>
    </View>
    {/* ) )} */}
  </>
);

const styles = StyleSheet.create({
  gradientBorder: {
    width: 37,
    height: 37,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: "black", // Adicione esta linha
    marginLeft: 3,
    marginRight: 3,
  },
  footerIcon: {
    width: 30,
    height: 30,
    color: "white",
    marginRight: 15,
  },
  shareIcon: {
    transform: [{ rotate: "320deg" }],
    marginTop: -3,
  },
});

export default Post;
