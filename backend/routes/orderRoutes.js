import express from 'express';

import { createOrder, getMyOrders, getOrderById, updateOrderToPaid, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post("/", createOrder);
router.get("/", getMyOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderToPaid);
router.get("/", getAllOrders);
export default router;