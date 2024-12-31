import e from "express";
import { authUser } from "../middlewares/authUser.js";
import { addCarToCart, getCart, getCartItems, removeCarFromCart,  } from "../controllers/cartController.js";
const router = e.Router();

router.post("/add-to-cart",authUser,addCarToCart);
router.get("/get-cart", authUser, getCart);
router.get("/get-cartItems", authUser, getCartItems);
// router.delete("/remove-car",authUser,removeCar);
router.delete("/remove-car",authUser,removeCarFromCart)


export { router as cartRouter };