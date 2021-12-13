import faker from 'faker'
const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should begin with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email')
      .type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(4))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email')
      .type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials are provided', () => {
    cy.intercept(/login/, {
      delay: 100,
      statusCode: 401,
      body: {
        error: faker.random.words(5)
      }
    })

    cy.getByTestId('email')
      .type(faker.internet.email())
    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should('contain.text', 'Credenciais Inválidas')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save access token if valid credentials are provided', () => {
    cy.intercept(/login/, {
      delay: 100,
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      }
    })

    cy.getByTestId('email')
      .type(faker.internet.email())
    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('Should presente InvalidCredentialsError on 400, 402, 404, 500', () => {
    cy.intercept(/login/, {
      delay: 100,
      statusCode: faker.helpers.randomize([400, 402, 404, 500]),
      body: {
        accessToken: faker.datatype.uuid()
      }
    })

    cy.getByTestId('email')
      .type(faker.internet.email())
    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should presente InvalidAccessTokenError if invalid data is returned', () => {
    cy.intercept(/login/, {
      delay: 100,
      statusCode: 200,
      body: {
        invalidProperty: faker.datatype.uuid()
      }
    })

    cy.getByTestId('email')
      .type(faker.internet.email())
    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should('contain.text', 'Ocorreu um problema no processo de autenticação')
  })
})
