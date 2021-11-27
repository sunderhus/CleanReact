import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'

import { Validation } from '@/presentation/protocols/validation'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import FormContext from '../../contexts/form'
import Styles from './styles.scss'

type FormState = {
  isLoading: boolean
  isFormInvalid: boolean
  name: string
  email: string
  password: string
  passwordConfirmation: string
  errors: {
    main: string
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState<FormState>({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {
      main: '',
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  })
  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    try {
      const hasValidationErros = !!state.errors.name || !!state.errors.email || !!state.errors.password || !!state.errors.passwordConfirmation

      if (state.isLoading || hasValidationErros) {
        return
      }

      setState({ ...state, isLoading: true })

      const account = await addAccount.add({ name: state.name, email: state.email, password: state.password, passwordConfirmation: state.passwordConfirmation })

      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({ ...state, errors: { ...state, main: error.message } })
    }
  }, [state])

  useEffect(() => {
    const nameError = validation.validate('name', state.name)
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)
    const passwordConfirmationError = validation.validate('passwordConfirmation', state.passwordConfirmation)

    setState({
      ...state,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError,
      errors: {
        ...state.errors,
        name: nameError,
        email: emailError,
        password: passwordError,
        passwordConfirmation: passwordConfirmationError
      }
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state: state, setState }} >
        <form className={Styles.form} autoComplete="off" onSubmit={handleSubmit} data-testid="signupForm">
          <h2>Cadastro</h2>
          <Input type="text" name="name" placeholder="Digite seu Nome" />
          <Input type="email" name="email" placeholder="Digite seu E-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <SubmitButton>Criar Conta</SubmitButton>
          <Link to="/login" data-testid="login-link" className={Styles.link}>Voltar ao login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
