import React, { createContext } from 'react'
interface SurveyContext {
  state: any
  setState: React.Dispatch<React.SetStateAction<any>>
}

export default createContext<SurveyContext>(null)
