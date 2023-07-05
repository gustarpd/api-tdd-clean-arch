# Clean Architecture NodejS API

Esta API em Node.js foi desenvolvida para um sistema de escritório de advocacia, proporcionando recursos essenciais para a gestão eficiente de advogados, clientes, processos/casos e documentos. Além disso, oferece uma área de agenda que permite a organização de tarefas diárias.

Recursos disponíveis na API:

- Cadastro e gerenciamento de advogados: possibilita a criação de novos advogados, além de permitir a visualização e atualização dos dados existentes.
- Adição e gestão de clientes: permite cadastrar novos clientes e gerenciar informações como nome, contato e detalhes relevantes.
- Gerenciamento de processos/casos: possibilita adicionar e atualizar informações sobre os processos/casos de cada cliente, como número do processo, status e informações relacionadas.
- Armazenamento e organização de documentos: oferece a funcionalidade de adicionar documentos importantes relacionados a cada caso ou cliente.
- Área de agenda: permite a organização de tarefas diárias, ajudando a priorizar e acompanhar as atividades do escritório.

Esta API foi construída utilizando Node.js e possui uma arquitetura sólida e de fácil manutenção. É uma solução flexível e escalável, capaz de se adaptar às necessidades específicas de cada escritório de advocacia.
Configuração e Uso

- Certifique-se de ter o Node.js e o docker/docker-compse instalado.
- Clone este repositório em sua máquina local.
- No diretório raiz do projeto, execute o comando npm install para instalar as dependências necessárias.
- Execute o comando ```docker compose up ``` para inicar o banco de dados.
- Configure as variáveis de ambiente, como as credenciais do banco de dados e as configurações de autenticação.
- Execute o comando npm start para iniciar a API.
- Acesse a API através da URL http://localhost:5858 ou da porta configurada.

Ferramentas usadas para desenvolver esse projeto:
- NodeJs
- MongoDb
- Jest
- Husky
- lint-staged
