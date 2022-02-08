import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Footer, Header } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import { SurveyItemEmpty, SurveyItem } from './components/'
import Styles from './styles.scss'

interface Props {
  loadSurveyList: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => {
        setState(current => ({ ...current, surveys }))
      })
      .catch((error) => {
        setState(current => ({ ...current, error: error.message }))
      })
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {!state.error ? (
          <ul data-testid="survey-list">
            {state.surveys.length
              ? state.surveys.map(survey => {
                return (
                  <SurveyItem key={survey.id} survey={survey} />
                )
              })
              : < SurveyItemEmpty />}
          </ul>
        ) : (
          <div data-testid="error">{state.error}</div>
        )}

      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
