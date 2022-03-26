export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult{
  export type Model = {
    question: string
    date: Date
    answers: Array<{
      image?: string
      asnwer: string
      count: number
      percent: number
      isCurrentAccountAnswer: boolean
    }>
  }
}
