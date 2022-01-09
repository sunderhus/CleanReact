import { Footer, Logo } from '@/presentation/components'
import React from 'react'
import Styles from './styles.scss'

export const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo/>
          <div className={Styles.logoutWrap}>
            <span>Rodrigo</span>
            <a href='#'>Sair</a>
          </div>
        </div>
      </header>
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>01</span>
                <span className={Styles.month}>05</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framwork favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>01</span>
                <span className={Styles.month}>05</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framwork favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>01</span>
                <span className={Styles.month}>05</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framwork favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>01</span>
                <span className={Styles.month}>05</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framwork favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
