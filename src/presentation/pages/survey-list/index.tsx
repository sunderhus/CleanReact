import React from 'react'
import { Header, Footer, Icon, IconName } from '@/presentation/components'
import Styles from './styles.scss'

export const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.surveyIcon} iconName={IconName.thumbUp} />
              <time>
                <span className={Styles.day}>01</span>
                <span className={Styles.month}>05</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framwork favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
