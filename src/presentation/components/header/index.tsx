import Logo from '@/presentation/components/logo'
import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Styles from './styles.scss'

const Header: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={(event) => handleLogout(event)} href='#'>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default Header
