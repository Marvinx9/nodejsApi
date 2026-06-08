export const groupsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/groupListItem',
  },
};
