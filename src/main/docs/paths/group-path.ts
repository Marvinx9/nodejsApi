export const groupPath = {
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Categoria'],
    summary: 'API para listar categorias',
    parameters: [
      {
        in: 'query',
        name: 'name',
        schema: {
          type: 'string',
        },
        required: false,
        description: 'Filtro parcial pelo nome da categoria',
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/groups',
            },
          },
        },
      },
      204: {
        description: 'Sem conteúdo',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },

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
      201: {},
      403: {
        $ref: '#/components/forbidden',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
