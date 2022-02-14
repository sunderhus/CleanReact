import React, { useContext } from 'react'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import * as Styles from './styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={Styles.listWrapper} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => {
          return (
            <SurveyItem key={survey.id} survey={survey} />
          )
        })
        : < SurveyItemEmpty />}
    </ul>
  )
}

export default List
