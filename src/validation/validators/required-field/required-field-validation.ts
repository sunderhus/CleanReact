import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocolos/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {
  }

  validate (fieldValue: string): RequiredFieldError {
    return fieldValue ? null : new RequiredFieldError()
  }
}
