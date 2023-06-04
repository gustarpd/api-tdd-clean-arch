## Agenda do Escritório

### Caso de Uso

- Receber uma requisição POST no endpoint /api/schedule.
- Validar se a requisição foi feita por um- usuário do sistema.
- Validar dados obrigatórios.
- Salvar um evento do escritório na agenda.
- Retornar o código de status 201 (Evento- criado com sucesso).

## Exceções

- Retornar o código de status 404 se o endpoint não existir.
- Retornar o código de status 403 se o usuário não estiver autorizado.
- Retornar o código de status 400 (Bad Request) se nem todos os dados forem fornecidos pelo cliente.
- Retornar o código de status 500 se ocorrer um erro ao criar um evento na agenda do escritório.