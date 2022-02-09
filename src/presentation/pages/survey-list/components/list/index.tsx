import React, { useContext } from 'react'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import { SurveyModel } from '@/domain/models'
import * as Styles from './styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={Styles.listWrapper} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: SurveyModel) => {
          return (
            <SurveyItem key={survey.id} survey={survey} />
          )
        })
        : < SurveyItemEmpty />}
    </ul>
  )
}

export default List
