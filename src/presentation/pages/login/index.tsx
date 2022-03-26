import React, { useContext, useEffect, useState } from 'react'
import { Authentication } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { ApiContext, FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { Link, useHistory } from 'react-router-dom'
import Styles from './styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
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

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)

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

      setState((old) => ({ ...old, isLoading: true }))

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      setCurrentAccount(account)

      history.replace('/')
    } catch (error) {
      setState((old) => ({
        ...old,
        isLoading: false,
        errors: {
          ...old.errors,
          main: error.message
        }
      }))
    }
  }

  const validate = (fieldName: string): void => {
    const { email, password } = state
    const formSchema = { email, password }
    const fieldError = validation.validate(fieldName, formSchema)
    setState((old) => ({
      ...old,
      errors: {
        ...old.errors,
        [fieldName]: fieldError
      }
    }))

    setState((old) => ({
      ...old,
      isFormInvalid: !!old.errors.email || !!old.errors.password
    }))
  }

  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

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
