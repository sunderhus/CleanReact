import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeRemoteAuthentication } from '@/main/usecases/authentication/remote-authentication-factory'
import { Login } from '@/presentation/pages'
import React from 'react'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
