export const forbidden = {
  description: 'Acesso negado',
  content: {
    'aplication/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
