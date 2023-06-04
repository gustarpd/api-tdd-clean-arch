## Area de trabalho

### Casos de sucesso

- Recebe uma requisição POST na rota api/tasks
- Valida se a requisição foi feita pro um usuario do sistema
- Valida dados obrigatorios
- Salva uma tarefa do escritorio
- Retorna 204 sem dados

### Exceções

- Retorna 404 se o endpoint nao existir
- Retorna 403 se o usuario não for autorizado
- Retorna 400 bad request se todos os dados nao for fornecidas pelo client
- Retorna 500 se acontecer um erro ao criar uma tarefa do escritorio
