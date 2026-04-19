import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';

import { createOrder, getMyOrders, getOrderById, updateOrderToPaid, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
export default router;
