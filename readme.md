### PROJETO FINAL - Luiza<code>

//=========APRESENTAÇÃO ======

### EQUIPE

- [Camila Sales] (https://github.com/KmylaSales)
- [Daniela Lima Ramos] (https://github.com/DaniLima4)
- [Kerem Jovielly] (https://github.com/KeremJovi)
- [Stacy Marreira] (https://github.com/stacymarreira)


<br />
<p align="center">
  <h2 align="center"> Wishlist - LuizaBooks</h2>

  <p align="center">
    Solução para criação de um módulo de listas de desejo de livros para o Magazon com uma API Rest 
    <br />
  </p>
</p>


//======== SOBRE O PROJETO ======

Esse projeto tem objetivo desenvolver uma APIRest em node.js, utilizando a base de dados relacional postgresql. Para realizar o cadastro de clientes e produtos e a criação de listas de desejos. 

//=====TECNOLOGIAS USADAS===========

Foi utilizado para desenvovimento do projeto as tecnologias: 
- [JavaScript]
- [Node.Js]
- [PostgreSQL]
- [Sequelize]

//===== INSTRUÇÃO PARA INSTALAÇÃO =====

### Instalação 

1. Clonar o repositório presente no Git https://github.com/KmylaSales/Projeto-Final.git

2. Realizar a instalação dos pacotes, com o seguinte comando

=> npm install 

3. Realizar o comando para rodar as "migrations" 

=> npx sequelize db:migrate

4. Executar a API 

=> nodemon src/server.js 

//=====CONEXÃO COM O BANCO=====// 

1. Instalar o banco "PgAdmin"

2. Alterar na pasta config, no arquivo database, os parâmetros de "username", "password" e "database", conforme criado atráves do PgAdmin do seu pc

Exemplo:

module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "luizacode02",
  database: "luizacode",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};



//===== INSTRUÇÃO PARA CRIAR, BUSCAR, EDITAR E EXCLUIR USUÁRIOS =====

### Cadastrar Usuários

1. É possível cadastrar usuários através do postman, por meio da rota:

    1.1 Usando o método POST informando nome, email e senha no corpo da requisição, utilizando a seguinte rota:
    http://localhost:3000/users

### Buscar usuários

2. Pode-se também buscar usuários cadastrados utilizando o postman, por meio da rota:

    2.1 Usando método GET sem parametros retornará todos os usuários cadastrados
  
    http://localhost:3000/users

    2.2 Usando o método GET passando parametro de ID retornará usuário onde o ID for igual ao informado

    http://localhost:3000/users/:id

    2.3 Usando o método GET passando parametro de email é retornado o usuário onde o email for igual ao informado

    http://localhost/3000/users/email/:req_email

    2.4 É possível realizar uma busca paginada nos usuários cadastrados. O usuário poderá alterar o número de páginas ao inserir um número depois da igualdade no parâmetro "page". Poderá também inserir o número de itens por página informando um número depois da igualdade no parâmetro "limit". Usuário poderá informar também no body o início da string para busca. No caso de usuário a busca será por "name".

    http://localhost:3000/users/name/searchp?page=1&limit=5

    2.5 É possível realizar uma busca de wishilist do usuário informando o ID

    http://localhost:3000/user/find/wishlist/:user_id

### Atualizando usuário 

3. É possivel atualizar informações dos usuários cadastrados 

    3.1 Usando o método PUT informando o parametro de email através da rota:

    http://localhost/3000/users/:req_email

    3.2 Foi escolhido para atualização do usuário o parametro do email do cliente

### Deletando usuário 

4. É possivel deletar um usuário cadastrado

    4.1 Através do método DELETE passando o parâmetro ID usando a rota:
    exemplo:
    http://localhost:3000/users/:id


//===== INSTRUÇÃO PARA CRIAR, BUSCAR, EDITAR E EXCLUIR WHISHLIST =====


### Cadastrar whishlist

1. É possível cadastrar whishlist através do postman, por meio da rota:

    1.1 Usando o método POST informado o ID do usuário, nome E ID do produto no corpo da requisição
    http://localhost:3000/wishlist/:user_id
    

### Buscar whishlist

2. Pode-se também buscar whishlist cadastradas utilizando o postman, por meio da rota:

    2.1 Usando o método GET passando parâmetro de ID do usuário onde o ID for igual ao informado

    http://localhost:3000/wishlist/search/:req_id

    2.2 Usando o método GET passando parametro produto é retornado o produto correspondente às whishlists que contém o produto

    http://localhost/3000/wishlist/find/:product

    2.5 É possível realizar uma busca paginada nas wishlists cadastradas. O usuário poderá alterar o número de páginas ao inserir um número depois da igualdade no parâmetro "page". Poderá também inserir o número de itens por página informando um número depois da igualdade no parâmetro "limit".

    http://localhost:3000/wishlist/searchp?page=3&limit=1


### Atualizando whishlist 

3. É possivel atualizar informações das whishlist cadastradas 

    3.1 Usando o método PUT informando o parametro de email através da rota:
 
    http://localhost/3000/wishlist/:req_wishlist_id

### Deletando whishlist 

4. É possivel deletar uma whishlist cadastrada 

    4.1 Através do método DELETE passando o parâmetro ID usando a rota:
  
    http://localhost:3000/wishlist/:id



    //===== INSTRUÇÃO PARA CRIAR, BUSCAR, EDITAR E EXCLUIR PRODUTOS =====


### Cadastrar produto

1. É possível cadastrar produto através do postman, por meio da rota:

    1.1 Usando o método POST informado o titulo, autor, descrição e o preco do produto

    http://localhost:3000/product
    

### Buscar produto

2. Pode-se também buscar produto cadastrados utilizando o postman, por meio da rota:

    2.1 Usando método GET sem parametros retornará o produto cadastrado com ID correspondente
    
    http://localhost:3000/product/search/:req_id

    2.2 Usando o método GET pesquisa vários produtos por filtro
  
    http://localhost:3000/product/searchAll

    2.3 É possível realizar uma busca paginada nos produtos cadastrados.
	  O usuário poderá alterar o número de páginas ao inserir um número depois da igualdade no parâmetro
	 "page". Poderá também inserir o número de itens por página informando um número depois da igualdade no parâmetro "limit".
	  Usuário poderá informar também no body o início da string para busca. No caso de produto buscar por "title"
 
    http://localhost:3000/product/name/searchp

    2.4 É possivel retornar produto cadastrado em uma whishlist informando o ID da whishlist
	
	http://localhost:3000/product/searchWishlist/:req_id
 
### Atualizando produto 

3. É possivel atualizar informações dos produtos cadastrados 

    3.1 Usando o método PUT informando o parametro de ID através da rota:

    http://localhost/3000/product/:req_id

### Deletando produto 

4. É possivel deletar um produto cadastrado

    4.1 Através do método DELETE passando o parâmetro ID usando a rota:
 
    http://localhost:3000/product/:req_id
