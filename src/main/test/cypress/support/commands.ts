// Must be declared global to be detected by typescript (allows import/export)
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      getByTestId(id: string): Chainable
    }
  }
}

// Convert this to a module instead of script (allows import/export)
export {}
