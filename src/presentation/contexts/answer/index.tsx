import { createContext } from 'react'

export interface AnswerContext {
  selectAnswer(answer: string): void
}

export default createContext<AnswerContext>(null)
