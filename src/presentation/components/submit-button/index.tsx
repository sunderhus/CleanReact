import React, { HTMLAttributes, useContext } from 'react'
import FormContext from '@/presentation/contexts/form'

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const SubmitButon: React.FC<Props> = ({ children, ...rest }: Props) => {
  const { state } = useContext(FormContext)
  return (
    <button data-testid="submit" type="submit" disabled={state.isFormInvalid} {...rest}>{children}</button>
  )
}

export default SubmitButon
