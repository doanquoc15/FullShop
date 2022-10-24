const User = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const router = require('express').Router();

//update user by id
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user.email !== req.body.email) {
            const emailInUse = await User.findOne({ email: req.body.email })
            if (emailInUse)
                return res.status(400).json('That email is already used!')
        }

        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.KEY_PASS).toString();
        }

        //update
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                // username: req.body.username,
                // email: req.body.email,
                // password
                $set: req.body
            },
            { new: true }
        );

        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete user by id
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(deleteUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get user by id
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all user
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const allUser = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//STATE USER

//1. get user stats
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastYear }
                },
            },
            {
                $project: {
                    month: { $month: '$createdAt' },
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 }
                }
            }
        ]);

        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router