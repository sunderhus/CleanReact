import { act, fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const fieldWrap = screen.queryByTestId(`${fieldName}-wrap`)
  const field = screen.queryByTestId(`${fieldName}`)
  const label = screen.queryByTestId(`${fieldName}-label`)

  expect(
    fieldWrap.getAttribute('data-invalid')
  ).toBe(validationError ? 'true' : 'false')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.queryByTestId(fieldName)
  act(() => {
    fireEvent.input(input, { target: { value: value } })
  })
}

export const testElementExists = (testId: string): void => {
  expect(screen.queryByTestId(testId)).toBeTruthy()
}

export const testElementText = (testId: string, text: string): void => {
  const element = screen.queryByTestId(testId)
  expect(element.textContent).toBe(text)
}
