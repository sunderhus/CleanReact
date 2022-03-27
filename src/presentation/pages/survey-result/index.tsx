import FlipMove from 'react-flip-move'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import faker from 'faker'
import React, { useEffect, useState } from 'react'
import Styles from './styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [survey, setSurvey] = useState<LoadSurveyResult.Model | null>(null)

  const handleReload = (): void => {
    setHasError(false)
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(setSurvey)
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap} data-testid="survey-result">
        {!!survey && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>{faker.random.words(15)}</h2>
            </hgroup>

            <FlipMove className={Styles.answersList}>
              <li>
                <img src={faker.image.imageUrl()} alt="fake photo" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src={faker.image.imageUrl()} alt="fake photo" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img src={faker.image.imageUrl()} alt="fake photo" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>

            <button>Voltar</button>
          </>
        )}

        {isLoading && <Loading />}
        {hasError && (
          <Error
            error=''
            reload={handleReload}
          />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
