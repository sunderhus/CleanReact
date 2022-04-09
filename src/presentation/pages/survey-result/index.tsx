import { LoadSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResulData } from '@/presentation/pages/survey-result/components'
import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
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
      <Footer />
    </div>
  )
}

export default SurveyResult
