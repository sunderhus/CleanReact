import React, { useContext } from 'react'

import Spinner from '../spinner'
import Styles from './styles.scss'
import FormContext from '@/presentation/contexts/form'

const FormStatus: React.FC = () => {
  const { state: { isLoading, errors } } = useContext(FormContext)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner}/>}
      {errors.main && <span className={Styles.error}>{errors.main}</span>}
    </div>
  )
}

export default FormStatus
