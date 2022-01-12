import { act, fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const fieldWrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const label = screen.getByTestId(`${fieldName}-label`)

  expect(
    fieldWrap.getAttribute('data-invalid')
  ).toBe(validationError ? 'true' : 'false')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  act(() => {
    fireEvent.input(input, { target: { value: value } })
  })
}

export const testElementExists = (testId: string): void => {
  expect(screen.getByTestId(testId)).toBeTruthy()
}

export const testElementText = (testId: string, text: string): void => {
  const element = screen.getByTestId(testId)
  expect(element.textContent).toBe(text)
}
