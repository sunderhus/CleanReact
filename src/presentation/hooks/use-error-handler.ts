import { AccessDeniedError } from '@/domain/Errors'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  return (error) => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      history.replace('/login')
    } else {
      callback(error)
    }
  }
}
