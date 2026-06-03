import paths from './paths';
import components from './components';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Enquete Quero API',
    description: 'API de enquetes',
    version: '2.0.0',
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
    {
      name: 'Enquete',
    },
    {
      name: 'Categoria',
    },
  ],
  paths,
  schemas,
  components,
};
