import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FormContext from '../../contexts/form'
import Styles from './styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

type FormState = {
  isLoading: boolean
  isFormInvalid: boolean
  email: string
  password: string
  errors: {
    email: string
    password: string
    main: string
  }
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const [state, setState] = useState<FormState>({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
      main: ''
    }
  })

  const history = useHistory()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.errors.email || state.errors.password) {
        return
      }

      if (state.isLoading) {
        return
      }

      setState({ ...state, isLoading: true })

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      await saveAccessToken.save(account.accessToken)

      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          main: error.message
        }
      })
    }
  }

  useEffect(() => {
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)

    setState({
      ...state,
      isFormInvalid: !!emailError || !!passwordError,
      errors: {
        ...state.errors,
        email: emailError,
        password: passwordError

      }
    })
  }, [state.email, state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} autoComplete="off" onSubmit={handleSubmit}>
          <h2>login</h2>
          <Input type="email" name="email" placeholder="Digite seu E-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton>Entrar</SubmitButton>
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar Conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
