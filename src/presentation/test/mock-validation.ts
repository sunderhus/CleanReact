import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string;

  validate (field: string, schema: object): string {
    return this.errorMessage
  }
}
