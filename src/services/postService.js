import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore"
import { auth, db } from "../lib/firebase"

// Get all photos
export const getPhotos = async (user) => {

    try {
      const userRef = doc(db,'users',user.uid)
      const userSnap = await getDoc(userRef)
  
      const photoCollections = collection(db, "posts");
      const photoQuery = query(photoCollections, orderBy("timestamp", "desc"));
  
      const photoSnapShot = await getDocs(photoQuery);
  
      const photos = await Promise.all(
        photoSnapShot.docs.map(async (doc) => {
          const photoData = doc.data();
  
          const userData = await getDoc(photoData.user);
  
          photoData.user = userData.data();
  
          
          
          return photoData;
        })
      );

      return { photos,user:userSnap.data()};
    } catch (error) {
      console.log(error);
    }
  };

  
// Like a photo
export const like = async (photo) => {

  console.log('oiiiii')
  const id = photo.photoId;
  console.log(auth.currentUser.uid)
  const currentUserId = auth.currentUser.uid;

  try {
    const postRef = doc(db, "posts", id);

    await updateDoc(postRef, {
      likes: arrayUnion(currentUserId),
    });

    photo.likes.push(currentUserId);
    return photo.likes;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};


export const deslike = async (id) => {
  const currentUserId = auth.currentUser.uid;

  try {
    const postRef = doc(db, "posts", id);

    await updateDoc(postRef, {
      likes: arrayRemove(currentUserId),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return error;
  }
};
  