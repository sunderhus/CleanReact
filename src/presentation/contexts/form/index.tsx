import { createContext } from 'react'

type FormState = {
  [key: string]: string | boolean | {[key: string]: string}
  isLoading: boolean
  errors: {
    main: string
  }
}

interface FormContext{
  state: FormState
  setState: React.Dispatch<React.SetStateAction<FormState>>
}

export default createContext<FormContext>(null)
