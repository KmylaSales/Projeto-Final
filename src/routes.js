// eslint-disable-next-line prettier/prettier
import { Router } from "express";

import UserController from "./app/controllers/UserController";

const routes = new Router();

// Rotas do usuario
routes.post("/users", UserController.store);

routes.put("/users/:req_email", UserController.update);

routes.get("/users/:id", UserController.index);

routes.get("/users/", UserController.findAll);

routes.post("/users/:id", UserController.index);

routes.post("/users/:id", UserController.findWishlist);

export default routes;
