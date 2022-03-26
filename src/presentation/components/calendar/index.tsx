import React from 'react'
import Styles from './styles.scss'

type Props = {
  date: Date
  className?: string
}

const Calendar: React.FC<Props> = ({ date, className }: Props) => {
  return (
    <time className={[Styles.calendarWrap, className].join(' ')}>
      <span data-testid="day" className={Styles.day}>
        {new Date(date).toLocaleString('pt-BR', { day: '2-digit' })}
      </span>
      <span data-testid="month" className={Styles.month}>
        {new Date(date).toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
      </span>
      <span data-testid="year" className={Styles.year}>
        {new Date(date).getFullYear()}
      </span>
    </time>
  )
}

export default Calendar
