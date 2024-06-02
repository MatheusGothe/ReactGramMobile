import {create} from 'zustand'
import { Login,SignOut } from '../services/userService'
import { auth } from '../lib/firebase'

export const useStore = create((set) => {
    
    return {
    userAuth: auth.currentUser,
    loading: false,
    setLoading:(value) => set({ loading:value}),
    setUser: (user) => set({ userAuth:user }),
    removeUser: () => set({ userAuth:null }),
    Login,
    SignOut,
}


})
