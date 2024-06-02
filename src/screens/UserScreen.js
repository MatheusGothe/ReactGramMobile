import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import BottomTabs from '../components/Home/BottomTabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SignOut } from '../services/userService';
import { useStore } from '../zustand/useStore';

const UserScreen = ({ navigation }) => {
  const [userAuth, removeUser, loading, setLoading] = useStore((state) => [
    state.userAuth,
    state.removeUser,
    state.loading,
    state.setLoading,
  ]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await SignOut();
      removeUser();
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: userAuth?.photoURL }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userAuth?.displayName}</Text>
        <Text style={styles.userEmail}>{userAuth?.email}</Text>
      </View>

      <TouchableOpacity onPress={handleSignOut}>
        <View style={styles.signOutButton}>
          <Button disabled={loading} title="Sair" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  signOutButton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default UserScreen;
