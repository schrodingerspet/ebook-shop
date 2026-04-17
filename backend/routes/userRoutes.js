import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} from "../controllers/userController.js";

const router = express.Router();

router.get("/wishlist", protect, getWishlist);
router.post("/wishlist/:id", protect, addToWishlist);
router.delete("/wishlist/:id", protect, removeFromWishlist);

export default router;