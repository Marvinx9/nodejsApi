## Enquete-Quero

Essa API foi desenvolvida usando os princípios de Clean Code

O objetivo do projeto é mostrar uma API com uma arquitetura bem definida e desacoplada, utilizando TDD (programação orientada a testes) como metodologia de trabalho, Clean Architecture para fazer a distribuição de responsabilidades em camadas, sempre seguindo os princípios do SOLID e, sempre que possível, aplicando Design Patterns para resolver alguns problemas comuns.

### Funcionalidades desta API

1. [Cadastro](./requirements/signup.md)
2. [Login](./requirements/login.md)
3. [Criar categoria](./requirementsc/add-categoria.md)
4. [Criar enquete](./requirements/add-survey.md)
5. [Listar enquetes](./requirements/load-surveys.md)
6. [Responder enquete](./requirements/save-survey-result.md)
7. [Resultado da enquete](./requirements/load-survey-result.md)

### Princípios

- Single Responsibility Principle (SRP)
- Open Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Interface Segregation Principle (ISP)
- Dependency Inversion Principle (DIP)
- Separation of Concerns (SOC)
- Don't Repeat Yourself (DRY)
- You Aren't Gonna Need It (YAGNI)
- Keep It Simple, Silly (KISS)
- Composition Over Inheritance
- Small Commits

### Design Patterns

- Factory
- Adapter
- Composite
- Decorator
- Proxy
- Dependency Injection
- Abstract Server
- Composition Root
- Builder
- Singleton

### Metodologias e Designs

- TDD
- Clean Architecture
- DDD
- Conventional Commits
- GitFlow
- Modular Design
- Dependency Diagrams
- Use Cases
- Continuous Integration
- Continuous Delivery
- Continuous Deployment

### Bibliotecas e Ferramentas

- NPM
- Typescript
- Git
- Docker
- Jest
- MongoDb
- Travis CI
- Swagger
- Bcrypt
- JsonWebToken
- Faker
- Coveralls
- Validator
- Express
- Apollo Server Express
- Graphql
- Graphql ISO Date
- Graphql Scalars
- Graphql Tools
- Supertest
- Husky
- Lint Staged
- Eslint
- Standard Javascript Style
- Sucrase
- Nodemon
- Rimraf
- In-Memory MongoDb Server
- MockDate
- Module-Alias
- Copyfiles
- Npm Check
- Bson ObjectId
- Apollo Server Integration Testing

### Features do Node

- Documentação de API com Swagger
- API Rest com Express
- GraphQL com Apollo Server
- Log de Erro
- Segurança (Hashing, Encryption e Encoding)
- CORS
- Middlewares
- Nível de Acesso nas Rotas (Admin, User e Anônimo)
- Deploy no Heroku
- Servir Arquivos Estáticos

### Features do GraphQL

- Types
- Queries
- Mutations
- Resolvers
- Directives
- Scalars
- Plugins

### Features do Git

- Alias
- Log Personalizado
- Branch
- Reset
- Amend
- Tag
- Stash
- Rebase
- Merge

### Features do Typescript

- POO Avançado
- Interface
- TypeAlias
- Namespace
- Utility Types
- Modularização de Paths
- Configurações
- Build
- Deploy
- Uso de Breakpoints

### Features de Testes

- Testes Unitários
- Testes de Integração (API Rest & GraphQL)
- Cobertura de Testes
- Test Doubles
- Mocks
- Stubs
- Spies
- Fakes

### Features do MongoDb

- Connect e Reconnect
- Collections
- InsertOne e InserMany
- Find, FindOne e FindOneAndUpdate
- DeleteMany
- UpdateOne
- Aggregation (Match, Group, Unwind, Lookup, AddFields, Project, Sort)
- ObjectId
- Upsert e ReturnOriginal
- Push, Divide, Multiply, ArrayElemAt, Cond, Sum
- Filter, Map, Reduce, MergeObjects, ConcatArrays

### Para rodar o projeto

**docker**
A forma mais fácil de rodar este projeto é via docker compose, tomei o cuidado de configurar todas as dependências (mongo-db + back-end) para que você não precise configurar o ambiente manualmente, você só precisa configurar as variáveis de ambiente, elas podem ser as mesmas que já estão no exemplo, sem problemas.

Caso você queira acessar o banco de dados para gerenciar suas colections no mondo-db, suba os containers e acesse seu localhost na porta 8081, informe seu usuário e senha de ME_CONFIG_BASICAUTH_USERNAME e ME_CONFIG_BASICAUTH_PASSWORD respectivamente. Coloquei a porta 8081 como padrão para o banco de dados, mas caso sua porta esteja ocupada, pode ir no docker-compose e alterar.

Você poderá testar as rota pelo swagger pelo endpoint usando a porta informada no seu .env

`http://localhost:{PORT}/api-docs/`

**MANUALMENTE**

Para rodar o projeto de forma manual, você irá precisar ter um banco do mongo-db configurado e pronto para receber conexões.

No .env você vai precisar informar a url de acesso, porta e secret do jwt:

```
MONGO_URL=mongodb://root:your_password@mongo:27017/clean-node-api?authSource=admin

JWT_SECRET=your_long_random_secret

PORT=8080
```

Certifique-se de estar com o Node instalado na versão 20 latest na sua máquina e então instale as dependências

`npm install`

Depois execute o projeto com

`npm run build && npm run start`
