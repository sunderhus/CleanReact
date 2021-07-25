import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState } from 'react'
import Styles from './styles.scss'
import FormContext from '../../contexts/form'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })
  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, errorState }}>
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
