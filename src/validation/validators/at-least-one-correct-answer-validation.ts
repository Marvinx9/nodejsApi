import { InvalidParamError } from '../../presentation/errors';
import { Validation } from '../../presentation/protocols/validation';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class AtLeastOneCorrectAnswerValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    const answers: any[] = input[this.fieldName];
    if (
      !Array.isArray(answers) ||
      !answers.some((a) => a.isCorrectAnswer === true)
    ) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
