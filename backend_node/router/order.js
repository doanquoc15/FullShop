const Order = require('../models/Order');
const { verifyTokenAndAuthorization,
    verifyTokenAndAdmin } = require('../middleware/verifyToken')
const router = require('express').Router();

//create order
router.post('/', verifyTokenAndAuthorization, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (error) {
        res.status(500).json(error)
    }
});

// //update order by id
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        //update
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );

        res.status(200).json(updateOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

// //delete order by id
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.id);
        res.status(200).send(deleteOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

// //get Order by userId
router.get('/find/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).json(error)
    }
})

// //get all Cart
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
});

//get month income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $sort: {
                    month : 1
                }
            },
            {
                $group: {
                    count: { $sum: 1 },
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router