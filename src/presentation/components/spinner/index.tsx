import React from 'react'
import Styles from './styles.scss'

type Props = React.HtmlHTMLAttributes<HTMLElement> & {
  isNegative?: boolean
};

const Spinner: React.FC<Props> = ({ className, isNegative, ...props }: Props) => {
  return (
    <div
      {...props}
      data-testid="spinner"
      className={`${Styles.spinner} ${isNegative && Styles.negative} ${className}
      `}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
