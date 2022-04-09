import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import React from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'
import Styles from './styles.scss'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const SurveyResulData: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map(answer => (
          <li
            className={
              answer.isCurrentAccountAnswer ? Styles.active : ''}
            data-testid="answer-wrap"
            key={answer.answer}
          >
            {answer.image && (
              <img
                data-testid="image"
                src={answer.image}
                alt={answer.answer}
              />)
            }
            <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
            <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
          </li>

        ))}
      </FlipMove>
      <button className={Styles.button} data-testid="back-button" onClick={goBack}>Voltar</button>
    </>
  )
}

export default SurveyResulData
