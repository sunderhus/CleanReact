import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import Styles from './styles.scss'

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
              <Calendar date={survey.date} className={Styles.calendarWrap} />
              <h2 data-testid="question">{survey.question}</h2>
            </hgroup>

            <FlipMove data-testid="answers" className={Styles.answersList}>
              {survey.answers.map(answer => (
                <li
                  className={
                    answer.isCurrentAccountAnswer ? Styles.active : ''}
                  data-testid="answer-wrap"
                  key={answer.asnwer}
                >
                  {answer.image && (
                    <img
                      data-testid="image"
                      src={answer.image}
                      alt={answer.asnwer}
                    />)
                  }
                  <span data-testid="answer" className={Styles.answer}>{answer.asnwer}</span>
                  <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
                </li>
              ))}
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
