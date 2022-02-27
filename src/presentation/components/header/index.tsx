import Logo from '@/presentation/components/logo'
import { ApiContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'
import React, { useContext } from 'react'
import Styles from './styles.scss'

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = useLogout()

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
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
