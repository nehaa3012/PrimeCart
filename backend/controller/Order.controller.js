import Order from "../models/Order.model.js";

// create order controller
export const createOrderController = async( req , res) => {
    try {
        const order = await Order.create({
            user: req.user._id,
            OrderItem: req.body.OrderItem,
            ShippingAddress: req.body.ShippingAddress,
            totalAmount: req.body.totalAmount,
            paymentMethod: req.body.paymentMethod,
            status: req.body.status,
        });
        res.status(201).json({
            success:true,
            order,
        }) 
    } catch (error) {
      res.status(500).json({
        success:false,
        message:"Failed to create order",
        error,
      })
    }
} 

// Get my orders controller
export const getMyOrdersController = async( req , res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({
            success:true,
            orders,
        }) 
    } catch (error) {
      res.status(500).json({
        success:false,
        message:"Failed to get orders",
        error,
      })
    }
} 

// Update order controller
export const updateOrderController = async( req , res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id);
        if (!order) {
            return res.status(404).json({
                success:false,
                message:"Order not found",
            })
        }
        order.status = req.body.status;
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }

        await order.save();

        res.status(200).json({
            success:true,
            order,
        }) 
    } catch (error) {
      res.status(500).json({
        success:false,
        message:"Failed to update order",
        error,
      })
    }
} 

