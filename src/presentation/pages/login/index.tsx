import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState } from 'react'
import Styles from './styles.scss'
import FormContext from '../../contexts/form'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={state}>
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
