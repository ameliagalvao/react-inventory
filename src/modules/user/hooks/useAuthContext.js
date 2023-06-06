import {AuthContext} from '../AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context){
        throw Error('useAuthContext deve estar dentro de um AuthContextProvider')
    }

    return context
}