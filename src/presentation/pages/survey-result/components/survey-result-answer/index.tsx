import { SurveyResultAnswerModel } from '@/domain/models'
import React from 'react'
import Styles from './styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const SurveyResultAnswer: React.FC<Props> = ({ answer }: Props) => {
  const activeClasName = answer.isCurrentAccountAnswer ? Styles.active : ''

  return (
    <li
      className={[Styles.answerWrap, activeClasName].join(' ')
      }
      data-testid="answer-wrap"
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
  )
}

export default SurveyResultAnswer
