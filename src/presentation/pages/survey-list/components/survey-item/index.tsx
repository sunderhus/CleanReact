import { LoadSurveyList } from '@/domain/usecases'
import { Icon, IconName } from '@/presentation/components'
import React from 'react'
import * as Styles from './styles.scss'

type Props ={
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.surveyIcon} iconName={survey.didAnswer ? IconName.thumbUp : IconName.thumbDown} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {new Date(survey.date).toLocaleString('pt-BR', { day: '2-digit' })}
          </span>
          <span data-testid="month" className={Styles.month}>
            {new Date(survey.date).toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid="year" className={Styles.year}>
            {new Date(survey.date).getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
