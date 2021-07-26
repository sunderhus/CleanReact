import { createContext } from 'react'

type FormState ={
  isLoading: boolean
  email: string
  password: string
  errors: {
    email: string
    password: string
    main: string
  }
}

interface FormContext{
  state: FormState
  setState: React.Dispatch<React.SetStateAction<FormState>>
}

export default createContext<FormContext>(null)
