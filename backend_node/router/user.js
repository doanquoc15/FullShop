const User = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const router = require('express').Router();
const moment = require('moment');
const { verify } = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

//update user by id
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user.email !== req.body.email) {
            const emailInUse = await User.findOne({ email: req.body.email })
            if (emailInUse)
                return res.status(400).json('That email is already used!')
        }

        // if (req.body.password) {

        //     console.log(req.body.password)
        //     const pass =  ;
        // }
        // console.log('user1', { ...req.body, password: pass })
        //update
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    ...req.body, password: CryptoJS.AES.encrypt(req.body.password,
                        process.env.KEY_PASS).toString()
                },

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
        const allUser = query ? await User.find().sort({ _id: -1 }).limit(4) : await User.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//STATE USER

//1. get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $sort: {
                    month: 1
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const previousMoth = moment()
        .month(moment().month() - 1)
        .set('date', 1)
        .format('YYYY-MM-DD HH:mm:ss');

    try {
        const users = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(previousMoth) }
                },
            },
            {
                $project: {
                    month: { $month: '$createdAt' },
                }
            },
            {
                $sort: {
                    month: 1
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 }
                }
            }
        ]);

        res.send(users)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})


module.exports = router