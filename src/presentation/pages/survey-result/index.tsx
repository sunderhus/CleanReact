import FlipMove from 'react-flip-move'
import { Calendar, Footer, Header, Loading } from '@/presentation/components'
import faker from 'faker'
import React from 'react'
import Styles from './styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
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

        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
