export const surveyAnswerSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string',
    },
    isCorrectAnswer: {
      type: 'boolean',
    },
  },
};
