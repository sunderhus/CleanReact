import { FieldValidation } from '@/presentation/validation/protocolos/field-validation'
import { RequiredFieldError } from '../errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {
  }

  validate (fieldValue: string): RequiredFieldError {
    return new RequiredFieldError()
  }
}
