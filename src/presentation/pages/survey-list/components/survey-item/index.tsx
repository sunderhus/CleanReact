import { LoadSurveyList } from '@/domain/usecases'
import { Calendar, Icon, IconName } from '@/presentation/components'
import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './styles.scss'

type Props ={
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.surveyIcon} iconName={survey.didAnswer ? IconName.thumbUp : IconName.thumbDown} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer><Link to={`survey/${survey.id}`}>Ver resultado</Link></footer>
    </li>
  )
}

export default SurveyItem
