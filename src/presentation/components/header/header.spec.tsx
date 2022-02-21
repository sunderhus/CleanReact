import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  getCurrentAccountMock(): AccountModel
  setCurrentAccountMock(account: AccountModel): void
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = jest.fn(() => account)
  const history = createMemoryHistory({ initialEntries: ['/'] })

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
    setCurrentAccountMock,
    getCurrentAccountMock,
    history
  }
}

describe('Header', () => {
  it('Should call setCurrentAccount with null value', () => {
    const { setCurrentAccountMock, history } = makeSut()

    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should render correct username', () => {
    const account = mockAccountModel()
    makeSut(account)

    expect(screen.queryByTestId('username')).toHaveTextContent(account.name)
  })
})
