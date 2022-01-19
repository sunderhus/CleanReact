import { Icon, IconName } from '@/presentation/components'
import React from 'react'
import * as Styles from './styles.scss'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
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
  )
}

export default SurveyItem
