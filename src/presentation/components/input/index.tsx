import FormContext from '@/presentation/contexts/form'
import React, { ChangeEvent, useContext, useRef } from 'react'
import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { state, setState } = useContext(FormContext)
  const error = state.errors[props.name]

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      title={error}
      data-invalid={!!error}
    >
      <input
        {...props}
        title={error}
        ref={inputRef}
        placeholder={' '}
        data-testid={`${props.name}`}
        onChange={(event) => handleChange(event)}
      />
      <label
        title={error}
        data-testid={`${props.name}-label`}
        onClick={() => inputRef.current.focus()}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
