// eslint-disable-next-line prettier/prettier
import { Router } from "express";

import UserController from "./app/controllers/UserController";
import ProductController from "./app/controllers/ProductController";
import WishlistController from "./app/controllers/WishlistController";

const routes = new Router();

// // Rotas do usuario
// //-----------------------------------------------------------------------------
routes.post("/users", UserController.store);
routes.put("/users/:req_email", UserController.update);
routes.delete("/users/:req_id", UserController.delete);
routes.get("/users/:id", UserController.index);
routes.get("/users/email/:req_email", UserController.findEmail);
routes.get("/users/name/all", UserController.findAll);
routes.get("/users/all", UserController.findAllUser);
routes.get("/users/wishlist/:user_id", UserController.findForWishlist);

// // Rotas Produtos
// //-----------------------------------------------------------------------------
routes.post("/product", ProductController.store);
routes.put("/product/:req_id", ProductController.update);
routes.delete("/product/delete/:req_id", ProductController.delete);
routes.get("/product/search/:req_id", ProductController.index);
routes.get("/product/searchAll", ProductController.findAll);
routes.get("/product/searchWishlist/:req_id", ProductController.findWishlist);

// // Rotas Wishlist
// //-----------------------------------------------------------------------------
routes.post("/wishlistProduct/:user_id", WishlistController.store);
// routes.put("/wishlist/", WishlistController.update);
// routes.delete("/wishlist/", WishlistController.delete);
// routes.get(
//   "/wishlist/wishlist_product/:wishlist_id",
//   WishlistController.findAllWishlist
// );

export default routes;
