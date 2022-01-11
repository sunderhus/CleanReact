import { makeRemoteAddAccount } from '@/main/usecases/add-account/remote-add-account-factory'
import { SignUp } from '@/presentation/pages'
import React from 'react'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
