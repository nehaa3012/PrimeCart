import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    OrderItem: [
        {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
    },
    ],
    ShippingAddress: {
        address: String,
        city: String,
        pincode: String,
        country: String,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["Cash On Delivery", "Card", "UPI"],
        default: "Cash On Delivery",
        required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing",
        required: true,
    },
    paidAt: {
        type: Date,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
