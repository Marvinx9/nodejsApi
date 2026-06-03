import {
  ValidationComposite,
  RequiredFieldValidation,
} from '../../../../../validation/validators';
import { Validation } from '../../../../../presentation/protocols/validation';

export const makeAddGroupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'image']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
