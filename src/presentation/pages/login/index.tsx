import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState, useEffect } from 'react'
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
      email: 'Campo obrigatório',
      password: 'Campo obrigatório',
      main: ''
    }
  })

  useEffect(() => {
    validation.validate('email', state.email)
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form} autoComplete="off">
          <h2>login</h2>
          <Input type="email" name="email" placeholder="Digite seu E-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar Conta</span>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
