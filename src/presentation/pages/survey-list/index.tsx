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

          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.surveyIcon} iconName={IconName.thumbUp} />
              <time>
                <span className={Styles.day}>01</span>
                <span className={Styles.month}>05</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quisquam, mollitia dolore inventore vero ducimus hic accusantium qui minima dicta at? Laborum autem ex atque ab corporis excepturi ullam cum.</p>
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
