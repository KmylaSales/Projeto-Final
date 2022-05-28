// eslint-disable-next-line prettier/prettier
import { Router } from "express";

import UserController from "./app/controllers/UserController";

import ProductController from "./app/controllers/ProductController";

import WishlistController from "./app/controllers/WishlistController";

const routes = new Router();

routes.post("/users", UserController.store);

routes.delete("/users/:id", UserController.delete);

routes.get("/users/:id", UserController.index);

routes.get("/users", UserController.findAll);

routes.get("/users/email/:req_email", UserController.findEmail);

routes.put("/users/:req_email", UserController.update);

routes.post("/product", ProductController.store)

routes.post("/wishlist", WishlistController.store)

// routes.put("/wishlist/:req_wishlist_id", WishListController.update)

// routes.get("/wishlist", WishlitController.index)

export default routes;
