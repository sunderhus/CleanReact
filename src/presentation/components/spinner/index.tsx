import React from 'react'
import Styles from './styles.scss'

type Props = React.HtmlHTMLAttributes<HTMLElement>;

const Spinner: React.FC<Props> = ({ className, ...props }: Props) => {
  return (
    <div {...props} data-testid="spinner" className={`${Styles.spinner} ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
