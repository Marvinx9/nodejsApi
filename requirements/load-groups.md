# Listar categorias

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/group**
2. ✅ Valida se a requisição foi feita por um **usuário** autenticado
3. ✅ Aceita o parâmetro opcional **name** via query string para busca parcial e case-insensitive
4. ✅ Retorna **204** se não houver nenhuma categoria
5. ✅ Retorna **200** com a lista de categorias contendo **id**, **name** e **countSurveys**

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário autenticado
3. ✅ Retorna erro **500** se der erro ao tentar listar as categorias
