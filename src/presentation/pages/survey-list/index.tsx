import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Footer, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Error, List, SurveyContext } from './components/'
import Styles from './styles.scss'

interface Props {
  loadSurveyList: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })
  const history = useHistory()
  const errorHandler = useErrorHandler((error: Error) => setState(current => ({ ...current, error: error.message })))

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => {
        setState(current => ({ ...current, surveys }))
      })
      .catch((error) => {
        errorHandler(error)
      })
  }, [state.reload, history])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>

        <SurveyContext.Provider value={{
          state,
          setState
        }}>
          {state.error ? <Error /> : <List />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
