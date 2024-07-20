export const unauthorized = {
  description: 'Credenciais inválidas',
  content: {
    'aplication/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
