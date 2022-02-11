import { createContext } from 'react'

interface FormState extends Record<string, any> {
  isLoading: boolean
  isFormInvalid: boolean
  errors: {
    main: string
  }
}

interface FormContext {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<FormState>>
}

export default createContext<FormContext>(null)
