import React, { useContext } from 'react'
import { SurveyContext } from '@/presentation/pages/survey-list/components'
import * as Styles from './styles.scss'

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  const handleReload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">
        {state.error}
      </span>
      <button onClick={handleReload} data-testid="reload">Recarregar</button>
    </div>
  )
}

export default Error
