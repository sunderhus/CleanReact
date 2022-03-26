import { AddAccount } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import FormContext from '@/presentation/contexts/form'
import { Validation } from '@/presentation/protocols/validation'
import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Styles from './styles.scss'

type FormState = {
  isLoading: boolean
  isFormInvalid: boolean
  name: string
  email: string
  password: string
  passwordConfirmation: string
  errors: {
    main: string
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState<FormState>({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {
      main: '',
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  })

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    try {
      const hasValidationErros = !!state.errors.name || !!state.errors.email || !!state.errors.password || !!state.errors.passwordConfirmation

      if (state.isLoading || hasValidationErros) {
        return
      }

      setState((old) => ({ ...old, isLoading: true }))

      const account = await addAccount.add({ name: state.name, email: state.email, password: state.password, passwordConfirmation: state.passwordConfirmation })

      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState((old) => ({
        ...old,
        isLoading: false,
        errors: {
          ...old.errors,
          main: error.message
        }
      }))
    }
  }, [state])

  const validate = (fieldName: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formSchema = { name, email, password, passwordConfirmation }
    const fieldError = validation.validate(fieldName, formSchema)
    setState((old) => ({
      ...old,
      errors: {
        ...old.errors,
        [fieldName]: fieldError
      }
    }))

    setState((old) => ({
      ...old,
      isFormInvalid: !!old.errors.name || !!old.errors.email || !!old.errors.password || !!old.errors.passwordConfirmation
    }))
  }

  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state: state, setState }} >
        <form className={Styles.form} autoComplete="off" onSubmit={handleSubmit} data-testid="signupForm">
          <h2>Cadastro</h2>
          <Input type="text" name="name" placeholder="Digite seu Nome" />
          <Input type="email" name="email" placeholder="Digite seu E-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <SubmitButton>Criar Conta</SubmitButton>
          <Link to="/login" data-testid="login-link" className={Styles.link}>Voltar ao login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
