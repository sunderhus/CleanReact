import { FieldValidation } from '@/validation/protocolos/field-validation'
import { Validation } from '@/presentation/protocols/validation'

export class ValidationComposite implements Validation {
  private constructor (private readonly validators: FieldValidation[]) { }

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(validator => validator.field === fieldName)

    for (const validator of validators) {
      const error: Error = validator.validate(fieldValue)
      if (error) {
        return error.message
      }
    }
  }
}
