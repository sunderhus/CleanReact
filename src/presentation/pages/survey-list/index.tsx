import { Footer, Header } from '@/presentation/components'
import React from 'react'
import { SurveyItemEmpty } from './components/'
import Styles from './styles.scss'

export const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
