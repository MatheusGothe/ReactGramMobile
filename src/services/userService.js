import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import {auth, db} from '../lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'


export const Login = async(data) => {

    console.log('teste')
    const {email,password} = data


    const userAuth = await signInWithEmailAndPassword(auth,email,password)
    return userAuth

}
export const Register = async(data)=> {

    const {password,username:name,email} = data

    const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      const defaultImage =
        "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";
  
      await updateProfile(firebaseUser, {
        displayName: name,
        photoURL: defaultImage,
      });
  
      const userCollection = collection(db, "users");
  
      const userQuery = query(userCollection, where("username", "==", name));
  
      const usersSnapShot = await getDocs(userQuery);
  
      if (!usersSnapShot.empty) {
        throw new Error("O email já esta em uso");
      }
  
      const res = await setDoc(doc(db, "users", firebaseUser.uid), {
        username: name,
        email: email,
        id: auth.currentUser.uid,
        profileImage: defaultImage,
        followers: [],
        following: [],
        createdAt: serverTimestamp(),
      });
  
      const userCollections = doc(db,'users',auth.currentUser.uid)
  
      const userDocSnap = await getDoc(userCollections)
  
      return userDocSnap.data()

}

export const SignOut = async() => {

    try {
        
        await signOut(auth)
        console.log("auth",auth)
        
    } catch (error) {
        console.log(error)
    }
}



