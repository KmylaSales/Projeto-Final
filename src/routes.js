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
routes.delete("/users/:product_id", UserController.delete);
routes.get("/users/:id", UserController.index);
routes.get("/users/email/:req_email", UserController.findEmail);
routes.get("/users/name/all", UserController.findAll);
routes.get("/users/wishlist/:user_id", UserController.findForWishlist);
routes.get("/users/name/searchp", UserController.SearchAllC);

// // Rotas Produtos
// //-----------------------------------------------------------------------------
routes.post("/product", ProductController.store);
routes.put("/product/:req_id", ProductController.update);
routes.delete("/product/delete/:product_id", ProductController.delete);
routes.get("/product/search/:req_id", ProductController.index);
routes.get("/product/searchAll", ProductController.findAll);
routes.get("/product/searchWishlist/:req_id", ProductController.findWishlist);
routes.get("/product/name/searchp", ProductController.SearchAllP);
routes.get("/product/title/searchp", ProductController.SearchAllP);

// // Rotas Wishlist
// //-----------------------------------------------------------------------------
routes.post("/wishlistProduct/:user_id", WishlistController.store);
routes.put("/wishlist/up/:user_id", WishlistController.update);
routes.delete("/wishlist/delete/:req_id", WishlistController.delete);
routes.get("/wishlist/find/:req_id", WishlistController.index);
routes.get(
  "/wishlist/searchWishlist/:user_id",
  WishlistController.findForWishlist
);
routes.get("/wishlist/searchp", WishlistController.SearchAllW);

export default routes;
