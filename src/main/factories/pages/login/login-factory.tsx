import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/usecases/authentication/remote-authentication-factory'
import { makeLocalSaveAccessToken } from '@/main/usecases/save-access-token/local-save-access-token-factory'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
