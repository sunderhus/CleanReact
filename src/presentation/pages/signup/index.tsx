import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState } from 'react'
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

const SignUp: React.FC = () => {
  const [state, setState] = useState<FormState>({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {
      main: '',
      name: 'Campo obrigatório',
      email: 'Campo obrigatório',
      password: 'Campo obrigatório',
      passwordConfirmation: 'Campo obrigatório'
    }
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state: state, setState }}>
        <form className={Styles.form} autoComplete="off" >
          <h2>Cadastro</h2>
          <Input type="text" name="name" placeholder="Digite seu Nome" />
          <Input type="email" name="email" placeholder="Digite seu E-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <button data-testid="submit" className={Styles.submit} type="submit" disabled>Criar Conta</button>
          <span className={Styles.link}>Voltar ao login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
