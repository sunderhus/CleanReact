import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Footer, Header } from '@/presentation/components'
import React, { useEffect } from 'react'
import { SurveyItemEmpty } from './components/'
import Styles from './styles.scss'

interface Props {
  loadSurveyList: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    const fetchList = async (): Promise<void> => {
      await loadSurveyList.loadAll()
    }
    fetchList()
  }, [])

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
