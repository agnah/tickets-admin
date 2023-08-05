import { useContext } from 'react'
import { authContext } from './AuthProvider'

function useAuth () {
  return useContext(authContext)
}

export default useAuth
