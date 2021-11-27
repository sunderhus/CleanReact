import { FieldValidation } from '@/validation/protocolos/field-validation'
import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import { CompareFieldsValidation } from '../compare-fields/compare-fields.validation'

export class ValidationBuilder {
  private constructor (private readonly fieldName: string, private readonly validations: FieldValidation[]) {

  }

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min (length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validations.push(new CompareFieldsValidation(this.fieldName, fieldToCompare))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
