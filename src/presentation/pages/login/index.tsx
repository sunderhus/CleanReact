import Footer from '@/presentation/components/footer'
import FormStatus from '@/presentation/components/form-status'
import Input from '@/presentation/components/input'
import LoginHeader from '@/presentation/components/login-header'
import React from 'react'
import Styles from './styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>login</h2>
        <Input type="email" name="email" placeholder="Digite seu E-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />

        <button className={Styles.submit} type="submit">Entrar</button>

        <span className={Styles.link}>Criar Conta</span>

        <FormStatus/>

      </form>
      <Footer />
    </div>
  )
}

export default Login
