import { InvalidParamError } from '../../presentation/errors';
import { AtLeastOneCorrectAnswerValidation } from './at-least-one-correct-answer-validation';

const makeSut = (): AtLeastOneCorrectAnswerValidation => {
  return new AtLeastOneCorrectAnswerValidation('answers');
};

describe('AtLeastOneCorrectAnswer Validation', () => {
  it('Should return an InvalidParamError if no answer has isCorrectAnswer = true', () => {
    const sut = makeSut();
    const error = sut.validate({
      answers: [
        { answer: 'any', isCorrectAnswer: false },
        { answer: 'other', isCorrectAnswer: false },
      ],
    });
    expect(error).toEqual(new InvalidParamError('answers'));
  });

  it('Should return an InvalidParamError if answers is not an array', () => {
    const sut = makeSut();
    const error = sut.validate({ answers: null });
    expect(error).toEqual(new InvalidParamError('answers'));
  });

  it('Should not return if at least one answer has isCorrectAnswer = true', () => {
    const sut = makeSut();
    const error = sut.validate({
      answers: [
        { answer: 'wrong', isCorrectAnswer: false },
        { answer: 'correct', isCorrectAnswer: true },
      ],
    });
    expect(error).toBeFalsy();
  });
});
