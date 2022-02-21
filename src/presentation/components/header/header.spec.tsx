import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

type SutTypes = {
  setCurrentAccountMock(account: AccountModel): void
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{
      getCurrentAccount: getCurrentAccountMock,
      setCurrentAccount: setCurrentAccountMock
    }}
    >
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>)

  return {
    setCurrentAccountMock
  }
}

describe('Header', () => {
  it('Should call setCurrentAccount with null value', () => {
    const { setCurrentAccountMock } = makeSut()

    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
