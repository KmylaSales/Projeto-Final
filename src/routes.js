// eslint-disable-next-line prettier/prettier
import { Router } from "express";

import UserController from "./app/controllers/UserController";

import ProductController from "./app/controllers/ProductController"


const routes = new Router();

routes.post("/users", UserController.store);

routes.delete("/users/:id", UserController.delete);

routes.get("/users/:id", UserController.index);

routes.get("/users", UserController.findAll);

routes.get("/users/email/:req_email", UserController.findEmail);

routes.put("/users/:req_email", UserController.update);




//Importar controller do Product

import ProductController from "./app/controllers/ProductController";

//Criar novo produto

routes.post("/product", ProductController.store);

// Deletar um produto 
routes.delete("/product/:id", ProductController.delete);

// //Atualizar um produto

routes.put("/product/:req_id", ProductController.update);

// //Pesquisar um produto - id

routes.get("/product/index/:id", ProductController.index);

// Procurar produto pelo inicio do nome 

routes.get("/product", ProductController.findAllProduct);


export default routes;
