import React from 'react'
import * as Styles from './styles.scss'

const SurveyItemEmpty: React.FC = () => {
  return (
    <>
      <li className={Styles.surveyItemEmpty} />
      <li className={Styles.surveyItemEmpty} />
      <li className={Styles.surveyItemEmpty} />
      <li className={Styles.surveyItemEmpty} />
    </>
  )
}

export default SurveyItemEmpty
