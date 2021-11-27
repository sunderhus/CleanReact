import { FieldValidation } from '@/validation/protocolos/field-validation'
import { Validation } from '@/presentation/protocols/validation'

export class ValidationComposite implements Validation {
  private constructor (private readonly validators: FieldValidation[]) { }

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (field: string, schema: object): string {
    const validators = this.validators.filter(validator => validator.field === field)

    for (const validator of validators) {
      const error: Error = validator.validate(schema)
      if (error) {
        return error.message
      }
    }
  }
}
