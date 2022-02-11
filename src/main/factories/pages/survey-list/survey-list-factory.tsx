import React from 'react'
import { makeRemoteLoadSurveyList } from '@/main/usecases/load-survey-list/remote-load-survey-list-factory'
import { SurveyList } from '@/presentation/pages'

export const makeSurveyList: React.FC = () => {
  return (
    <SurveyList
      loadSurveyList={makeRemoteLoadSurveyList()}
    />
  )
}
