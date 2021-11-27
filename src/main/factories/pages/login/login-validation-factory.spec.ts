import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

describe('LoginValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build()
      ])
    )
  })
})
