import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    const orderItems = req.body.items || req.body.orderItems || [];
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        return res.status(400).json({ message: "order items are required" });
    }

    const order = await Order.create({
        user: req.user._id,
        orderItems,
        totalPrice: req.body.totalPrice,
        paymentMethod: req.body.paymentMethod,
        shippingAddress: req.body.shippingAddress,
        paymentResult: req.body.paymentResult
    });
    return res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    return res.json(orders);
};

export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return res.status(404).json({ message: "order not found" });
    }
    return res.json(order);
};

export const updateOrderToPaid = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };
        const updatedOrder = await order.save();
        return res.json(updatedOrder);
    }

    return res.status(404).json({ message: "order not found" });
};

export const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).populate("user", "name email");
    return res.json(orders);
};
