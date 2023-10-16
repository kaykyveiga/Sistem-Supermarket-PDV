# API System Establishment PDV

## Descrição

A **API System Establishment PDV** é um sistema criado para estabelecimentos de venda, como supermercados, lojas de roupas, lojas de sapatos e outros. Este projeto foi desenvolvido para fins de estudo, utilizando tecnologias como Node.js, MySQL, Express e Sequelize, seguindo a arquitetura MVC.

## Funcionalidades

- Cadastro e login de empresas e usuários (colaboradores da empresa) com autenticação, utilizando a biblioteca JSON Web Token (JWT).
- Cadastro, edição e remoção de produtos da empresa.
- Sistema de carrinhos de compras: Criação de carrinhos e adição de produtos com a quantidade desejada.
- Sistema de controle de estoque com atualização a cada venda.

## Endpoints

### Estabelecimento

- `POST /establishment/register`: Cadastra um novo usuário.
- `POST /establishment/login`: Permite o login de um usuário existente.
- `GET /establishment/getuser`: Retorna informações de um usuário pelo token.
- `PATCH /establishment/edituser`: Atualiza as informações de um usuário existente usando o token.

### Produtos

- `POST /product/create`: Cadastra um novo produto.
- `DELETE /product/delete/:id`: Deleta um produto pelo ID.
- `PATCH /product/:id`: Edita um produto pelo ID.
- `GET /product/all`: Retorna todos os produtos cadastrados.
- `GET /product/q`: Retorna todos os produtos com base em uma busca.
- `GET /product/:id`: Retorna um produto pelo ID.
- `POST /product/addcart/:id`: Adiciona um produto ao carrinho com base no ID.
- `GET /product/getcart/:id`: Retorna informações de um carrinho pelo ID.
- `POST /product/updatestock/:id`: Atualiza o estoque dos produtos com base no ID do carrinho.
- `POST /product/expirationcart`: Atualiza a lista de carrinhos do sistema.

Correios Brasil
POST /consultacep: Retorna o CEP passado pelo req.body.
POST /calcprecoprazo: Retorna todos os valores/dados do cálculo do preço de uma encomenda.
POST /rastrearencomenda: Rastreia e cadastra uma nova encomenda passada pelo req.body.
Autenticação
Explique como funciona a autenticação na sua API. Você pode mencionar o uso de JWT (Json Web Token) e como os usuários podem obter um token de autenticação.

Pré-requisitos
Liste todos os pré-requisitos para usar sua API, incluindo qualquer software ou bibliotecas necessárias.

Instalação
Forneça instruções passo a passo sobre como instalar e configurar sua API.

Uso
Explique como os usuários podem usar sua API. Forneça exemplos de solicitações e respostas.

Contribuição
Se você deseja permitir que outras pessoas contribuam para o seu projeto, explique como elas podem fazê-lo.

Licença
Declare a licença sob a qual seu projeto é lançado. Exemplo: MIT License.

Contato
Forneça informações de contato para você ou sua equipe.

Exemplos
Se você tiver exemplos de código ou casos de uso da sua API, inclua-os aqui.

Isso é apenas um exemplo de como você pode estruturar o README. Certifique-se de adaptá-lo às necessidades específicas do seu projeto. Um README bem elaborado pode ser uma ferramenta valiosa para ajudar os usuários a entender e usar sua API.