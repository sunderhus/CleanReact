import { act, fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const fieldWrap = screen.queryByTestId(`${fieldName}-wrap`)
  const field = screen.queryByTestId(`${fieldName}`)
  const label = screen.queryByTestId(`${fieldName}-label`)

  expect(fieldWrap).toHaveAttribute('data-invalid', validationError ? 'true' : 'false')
  expect(field).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.queryByTestId(fieldName)
  act(() => {
    fireEvent.input(input, { target: { value: value } })
  })
}
