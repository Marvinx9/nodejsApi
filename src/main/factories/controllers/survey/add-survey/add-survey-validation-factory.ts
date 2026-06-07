import {
  AtLeastOneCorrectAnswerValidation,
  ValidationComposite,
  RequiredFieldValidation,
} from '../../../../../validation/validators';
import { Validation } from '../../../../../presentation/protocols/validation';

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['question', 'groupId', 'answers']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new AtLeastOneCorrectAnswerValidation('answers'));
  return new ValidationComposite(validations);
};
