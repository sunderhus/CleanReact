import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import FormContext from '../../contexts/form'
import Styles from './styles.scss'

type FormState = {
  isLoading: boolean
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
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<FormState>({
    isLoading: false,
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
  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
  }, [])

  useEffect(() => {
    setState({
      ...state,
      errors: {
        ...state.errors,
        name: validation.validate('name', state.name),
        email: validation.validate('email', state.email),
        password: validation.validate('password', state.password),
        passwordConfirmation: validation.validate('passwordConfirmation', state.passwordConfirmation)
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
          <button data-testid="submit" className={Styles.submit} type="submit" disabled={!!state.errors.name || !!state.errors.email || !!state.errors.password || !!state.errors.passwordConfirmation}>Criar Conta</button>
          <span className={Styles.link}>Voltar ao login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
