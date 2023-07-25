import express from "express";
import { addToCart, deleteCart, getCart } from "../controllers/cart";
//
const router = express.Router();

router.get("/view-cart", getCart);
router.post("/add-to-cart", addToCart);
router.delete("/remove-cart/:id", deleteCart);

export default router;
