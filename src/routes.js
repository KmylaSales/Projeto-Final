// eslint-disable-next-line prettier/prettier
import { Router } from "express";

import UserController from "./app/controllers/UserController";

import ProductController from "./app/controllers/ProductController";

import WishlistController from "./app/controllers/WishlistController";

const routes = new Router();

routes.post("/users", UserController.store);

routes.delete("/users/:id", UserController.delete);

routes.delete("/wishlist/delete/:id", WishlistController.deleteWishes);

routes.get("/users/:id", UserController.index);

routes.get("/wishlist/index/:id", WishlistController.indexWishes)

routes.get("/users", UserController.findAll);

routes.get("/wishlist/find", WishlistController.findAllWishes);

routes.get("/wishlist/find/:id", WishlistController.findWishlist)

routes.get("wishlist/find/:product", WishlistController.findWishlistProduct)

routes.get("/users/email/:req_email", UserController.findEmail);

routes.put("/users/:req_email", UserController.update);


routes.put("/wishlist/:req_wishlist_id", WishlistController.updateId)

routes.post("/product", ProductController.store)



// routes.get("/wishlist", WishlitController.index)

routes.post("/wishlist/:user_id", WishlistController.store);


//Importar controller do Product

import ProductController from "./app/controllers/ProductController";

//Criar novo produto

routes.post("/product", ProductController.store);

// Deletar um produto 
routes.delete("/product/:id", ProductController.delete);

// //Atualizar um produto

routes.put("/product/:req_title", ProductController.update);

// //Pesquisar um produto - id

routes.get("/product/index/:id", ProductController.index);


export default routes;
