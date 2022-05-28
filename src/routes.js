// eslint-disable-next-line prettier/prettier
import { Router } from "express";

import UserController from "./app/controllers/UserController";

const routes = new Router();

routes.post("/users", UserController.store);

routes.delete("/users/:id", UserController.delete);

routes.get("/users/:id", UserController.index);

routes.get("/users", UserController.findAll);

routes.get("/users/email/:req_email", UserController.findEmail);

routes.put("/users/:req_email", UserController.update);

export default routes;
