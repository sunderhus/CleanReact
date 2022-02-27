import { ApiContext } from '@/presentation/contexts'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  return () => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
