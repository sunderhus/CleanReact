import { makeRemoteLoadSurveyResult } from '@/main/usecases/load-survey-result/remote-load-survey-result-factory'
import { makeRemoteSaveSurveyResult } from '@/main/usecases/save-survey-result copy/remote-save-survey-result-factory'
import { SurveyResult } from '@/presentation/pages'
import React from 'react'
import { useParams } from 'react-router-dom'

type RouteParams = {
  id: string
}

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<RouteParams>()

  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
