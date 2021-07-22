import React from 'react'
import Styles from './styles.scss'
import Spinner from '@/presentation/components/spinner'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <img src="https://via.placeholder.com/100x100?text=4Devs" />
        <h1>4Dev - Enquetes para programadores</h1>
      </header>
      <form className={Styles.form}>
        <h2>login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu E-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span className={Styles.status}>🔴</span>
        </div>
        <button className={Styles.submit} type="submit">Entrar</button>

        <span className={Styles.link}>Criar Conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>Erro</span>
        </div>

      </form>
      <footer className={Styles.footer}></footer>
    </div>
  )
}

export default Login
