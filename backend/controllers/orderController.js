import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    const order = await Order.create({
        user: req.user._id,
        orderItems: req.body.items,
        totalPrice: req.body.totalPrice,
        paymentMethod: req.body.paymentMethod,
        shippingAddress: req.body.shippingAddress,
        paymentResult: req.body.paymentResult
    });
    res.json(order);
}

export const getMyOrders = async (req, res) => {
    const order = await Order.find({ user: user._id });
    res.json(order);
}

export const getOrderById = async (req, res) => {
    const torder = await Order.findById(req.params.id).populate("user", "name email");
    res.json(torder);
}

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
        res.json(updatedOrder);
    }
    else {
        res.status(404).json({ message: "order not found" });
    }
}

export const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
}
