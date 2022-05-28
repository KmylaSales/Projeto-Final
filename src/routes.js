// eslint-disable-next-line prettier/prettier
import { Router } from "express";

import UserController from "./app/controllers/UserController";
import ProductController from "./app/controllers/ProductController";

const routes = new Router();

// Rotas do usuario
routes.post("/users", UserController.store);

routes.delete("/users/:id", UserController.delete);

routes.get("/users/:id", UserController.index);

routes.get("/users", UserController.findAll);

routes.get("/users/email/:req_email", UserController.findEmail);

routes.put("/users/:req_email", UserController.update);

// Rotas Produtos
routes.post("/users/product", ProductController.store);

routes.put("/users/product/:req_title", ProductController.update);

export default routes;
