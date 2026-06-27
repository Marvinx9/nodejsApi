export const addSurveyParamsSchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string',
    },
    groupId: {
      type: 'string',
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer',
      },
    },
  },
};
