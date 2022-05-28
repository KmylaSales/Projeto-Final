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

routes.post("/wishlist", WishlistController.store)

<<<<<<< HEAD
=======
routes.put("/wishlist/:req_wishlist_id", WishListController.updateId)

// routes.get("/wishlist", WishlitController.index)
>>>>>>> a9eb1f9d1995d6011c7bdfb8f63ae8fb95b11c17

export default routes;
