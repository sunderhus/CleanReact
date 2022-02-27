import { AccessDeniedError } from '@/domain/Errors'
import { useLogout } from './use-logout'
type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const logout = useLogout()

  return (error) => {
    if (error instanceof AccessDeniedError) {
      logout()
    } else {
      callback(error)
    }
  }
}
