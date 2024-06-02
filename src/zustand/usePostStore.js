import { create } from "zustand";

export const usePostStore = create((set) => {

    return {
      post: [],
      loading: false,
      setLoading: (value) => set({ loading: value }),
      setPosts: (item) => set((state) => ({ post: item })),
      setLike: (photo, user) => {
        set((state) => {
          //const updatedLikes = [...state.post.likes,user.userId]

          console.log("state", state);
          const updatedPosts = state.post.map((post) => {
            if (photo.photoId == post.photoId) {
              return { ...post, likes: [...post.likes, user.uid] };
            } else {
              return post;
            }
          });

          // console.log("photo toadd",photoToAdd)

          return {
            post: updatedPosts,
          };
        });
      },
      removeLike: (photo, user) => {
        set((state) => {
          const updatedPosts = state.post.map((post) => {
            if (post.photoId == photo.photoId) {
              const likes = post.likes.filter((id) => {
                return id !== user.uid;
              });
              return { ...post, likes };
            } else {
              return post;
            }
          });

          return {
            post: updatedPosts,
          };
        });
      },
    };

    
    })