export const serverError = {
  description: 'Erro interno no servidor',
  content: {
    'aplication/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
