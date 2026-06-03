export const groupPath = {
  post: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Categoria'],
    summary: 'API para criar uma categoria',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addGroupParams',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Sucesso',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
