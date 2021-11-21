import { act, fireEvent, RenderResult } from '@testing-library/react'
import faker from 'faker'

export const testElementChildCount = async (sut: RenderResult, testId: string, count: number): Promise<void> => {
  const wrapElement = await sut.findByTestId(testId)
  expect(wrapElement.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, testId: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)

  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const input = sut.getByTestId(fieldName)
  act(() => {
    fireEvent.input(input, { target: { value: value } })
  })
}

export const testElementExists = (sut: RenderResult, testId: string): void => {
  expect(sut.getByTestId(testId)).toBeTruthy()
}
