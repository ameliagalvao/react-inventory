import { useEffect, useState } from "react";
import {useAuthContext} from './useAuthContext';
import {auth} from '../../infra/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch} = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true)
        try{
            const res = await signInWithEmailAndPassword(auth, email, password)
            dispatch({type: 'LOGIN', payload: res.user})
            setIsPending(false)
            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }

        } catch(err){
          // Não está funcionando direito
          if (!isCancelled) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
          }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {login, error, isPending}
}