import React from 'react'

import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import PrivateRoute from '.'

describe('PrivateRoute', () => {
  test('Should redirect to /login when token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })

    render(
      <Router history={history}>
        <PrivateRoute />
      </Router>
    )

    expect(history.location.pathname).toBe('/login')
  })
})
