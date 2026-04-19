import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orderItems: [
            {
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Book"
                },
                title: String,
                qty: Number,
                price: Number,
                image: String
            }
        ],
        shippingAddress: {
            address: String,
            city: String,
            postalCode: String,
            country: String
        },
        paymentMethod: {
            type: String,
            default: "COD"
        },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        paidAt: Date
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
