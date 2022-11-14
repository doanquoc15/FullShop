const Customer = require('../models/Customer');
const { verifyTokenAndAuthorization, verifyToken } = require('../middleware/verifyToken')
const router = require('express').Router();

router.post('/', verifyToken, async (req, res) => {
    const newCustomer = new Customer(req.body);
    try {
        const saveCustomer = await newCustomer.save();
        res.status(200).json(saveCustomer);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all customer
router.get('/', verifyToken, async (req, res) => {
    try {
        const customer = await Customer.find();
        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router