import { useContext } from 'react'
import { authContext } from './AuthContext'

function useAuth () {
  return useContext(authContext)
}

export default useAuth
