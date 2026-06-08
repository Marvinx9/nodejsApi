export const surveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    groupId: {
      type: 'string',
    },
    question: {
      type: 'string',
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer',
      },
    },
    date: {
      type: 'string',
    },
    didAnswer: {
      type: 'boolean',
    },
  },
  required: ['id', 'groupId', 'question', 'answers', 'date'],
};
