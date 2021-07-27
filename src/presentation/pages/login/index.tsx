import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import Styles from './styles.scss'
import FormContext from '../../contexts/form'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

type FormState ={
  isLoading: boolean
  email: string
  password: string
  errors: {
    email: string
    password: string
    main: string
  }
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<FormState>({
    isLoading: false,
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
      main: ''
    }
  })

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
  }, [])

  useEffect(() => {
    setState({
      ...state,
      errors: {
        ...state.errors,
        email: validation.validate('email', state.email),
        password: validation.validate('password', state.password)
      }
    })
  }, [state.email, state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form} autoComplete="off" onSubmit={handleSubmit}>
          <h2>login</h2>
          <Input type="email" name="email" placeholder="Digite seu E-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled={!!state.errors.email || !!state.errors.password} className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar Conta</span>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
