import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocolos/field-validation'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {
  }

  validate (schema: object): Error {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const isEmpty = !schema[this.field]
    return isEmpty || emailRegex.test(schema[this.field]) ? null : new InvalidFieldError()
  }
}
