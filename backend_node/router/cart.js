const Cart = require('../models/Cart');
const { verifyTokenAndAuthorization,
    verifyTokenAndAdmin } = require('../middleware/verifyToken')
const router = require('express').Router();

//create cart
router.post('/',verifyTokenAndAuthorization, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const saveCart = await newCart.save();
        res.status(200).json(saveCart);
    } catch (error) {
        res.status(500).json(error)
    }
});

// //update cart by id
router.put('/:id',verifyTokenAndAuthorization, async (req, res) => {
    try {
        //update
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );

        res.status(200).json(updateCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

// //delete cart by id
router.delete('/:id',verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deleteCart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send(deleteCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

// //get cart by id
router.get('/find/:userId',verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.userId });
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).json(error)
    }
})

// //get all Cart
router.get('/',verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router