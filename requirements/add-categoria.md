# Criar Categoria
> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/group**
2. ✅ Valida se a requisição foi feita por um **admin**
3. ✅ Valida dados obrigatórios **name** e **image**
4. ✅ **Cria** uma categoria com os dados fornecidos
5. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se o usuário não for admin
3. ✅ Retorna erro **400** se name ou image não forem fornecidos pelo client
5. ✅ Retorna erro **403** se o nome da categoria fornecido já estiver em uso
4. ✅ Retorna erro **500** se der erro ao tentar criar a categoria
