import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Footer, Header, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { List } from './components/'
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

  const handleError = useErrorHandler((error: Error) => setState(old => ({ ...old, error: error.message })))

  const handleReload = useCallback(() => {
    setState(old => ({
      surveys: [],
      error: '',
      reload: !old.reload
    }))
  }, [])

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => {
        setState(old => ({ ...old, surveys }))
      })
      .catch((error) => {
        handleError(error)
      })
  }, [state.reload, history])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>

        {state.error
          ? (
            <Error
              error={state.error}
              reload={handleReload}
            />
          )
          : <List surveys={state.surveys} />
        }

      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
