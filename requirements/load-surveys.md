# Listar enquetes

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/surveys**
2. ✅ Valida se a requisição foi feita por um **usuário**
3. ✅ Aceita o parâmetro opcional **groupId** via query string para filtrar enquetes de um grupo específico
4. ✅ Retorna **204** se não tiver nenhuma enquete
5. ✅ Retorna **200** com os dados das enquetes (sem o campo **isCorrectAnswer** nas respostas)

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário
3. ✅ Retorna erro **500** se der erro ao tentar listar as enquetes
