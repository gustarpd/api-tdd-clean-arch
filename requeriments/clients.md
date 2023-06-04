## Clientes

### Casos de sucesso

- Recebe uma requisição na rota /api/clients
- Valida se a requisição foi feita por um usuario do sistema
- Valida dados obrigatorio
- Salva uma tarefa do escritorio
- Retorna 201 quando salvar um cliente no banco de dados

### Rxceções

- Retorna 404 se o endpoint nao existir
- Retorna 403 se o usuario não não for autorizado
- Retorna 400 se todos os dados nao for fornecidos pelo client
- Retorna 500 se acontecer um erro ao criar uma tarefa no escitorio