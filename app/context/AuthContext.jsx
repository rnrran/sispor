import { createContext, useEffect, useReducer, useState} from 'react';
import AuthReducer from './AuthReducer'
import { doc, getDoc } from 'firebase/firestore';
import { db }from '../firebase'  

const INITIAL_STATE ={
    currentUser :  JSON.parse(localStorage.getItem("user")) || null ,
    // currentUser :  JSON.parse(localStorage.getItem("user")) || null ,

};

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const [data, setData]   = useState({}) 

    useEffect(
        () => {
            localStorage.setItem("user", JSON.stringify(state.currentUser))
        }, [state.currentUser]
    )
    

    // buatfetching atribut dari user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (state.currentUser) {
                    // Ambil dokumen spesifik berdasarkan UID dari currentUser
                    const userDocRef = doc(db, "users", state.currentUser.uid);
                    const userSnapshot = await getDoc(userDocRef);
                    
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        setData(userData)
    
                    } else {
                        console.log("No such document!");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUser();
    }, [state.currentUser]);

    // useEffect(() => {
    //     console.log("State data updated:", data);
    // }, [data]);


    return (
        <AuthContext.Provider value={{currentUser: state.currentUser, dispatch, userData:  data} }>
            {children}
        </AuthContext.Provider>
    )
}