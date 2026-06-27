export const groupListItemSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    countSurveys: {
      type: 'integer',
    },
  },
  required: ['id', 'name', 'countSurveys'],
};
