import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useReducer, useEffect } from 'react';
import {auth} from '../infra/firebase';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch(action.type){
      case 'LOGIN':
        return {...state, user: action.payload}
      case 'LOGOUT':
        return {...state, user: null}
      case 'AUTH_IS_READY':
        return {...state, user: action.payload, authIsReady: true}
      default:
        return state
    }
  }
  
  const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: null,
      authIsReady: false
    })

   useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
    } else {
      // User is not logged in
      dispatch({ type: 'AUTH_IS_READY', payload: null });
    }
    unsub();
  });
}, []);

    
    console.log('AuthContext state:', state)
  
    return (
      <AuthContext.Provider value={{...state, dispatch}}>
        {children}
      </AuthContext.Provider>
    )
  }

  export {AuthContext, AuthContextProvider, authReducer}