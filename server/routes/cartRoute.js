import e from "express";
import { authUser } from "../middlewares/authUser.js";
import { addCarToCart, getCart, getCartItems, removeCarFromCart,clearCart } from "../controllers/cartController.js";
const router = e.Router();

router.post("/add-to-cart",authUser,addCarToCart);
router.get("/get-cart", authUser, getCart);
router.get("/get-cartItems", authUser, getCartItems);
router.delete("/remove-car",authUser, removeCarFromCart);
router.delete("/clear-cart", authUser,clearCart);

export { router as cartRouter };