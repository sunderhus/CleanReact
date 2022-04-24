import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { AnswerContext } from '@/presentation/contexts'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResulData } from '@/presentation/pages/survey-result/components'
import React, { useCallback, useEffect, useState } from 'react'
import Styles from './styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult
}: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setError(error.message)
    setSurvey(null)
  })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [survey, setSurvey] = useState<LoadSurveyResult.Model | null>(null)

  const handleReload = (): void => {
    setError('')
    setIsLoading(false)
    setSurvey(null)
    setReload(true)
  }

  const handleSelect = useCallback((answer: string) => {
    setIsLoading(true)
    saveSurveyResult.save({ answer })
      .then()
      .catch()
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setIsLoading(true)
    loadSurveyResult.load()
      .then((result) => {
        setSurvey(result)
      })
      .catch(handleError)
      .finally(() => setIsLoading(false))
  }, [reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <AnswerContext.Provider value={{
        selectAnswer: handleSelect
      }}>
        <div className={Styles.contentWrap} data-testid="survey-result">
          {!!survey && <SurveyResulData surveyResult={survey} />}

          {isLoading && !error && <Loading />}

          {!!error && (
            <Error
              error={error}
              reload={handleReload}
            />
          )}
        </div>
      </AnswerContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
