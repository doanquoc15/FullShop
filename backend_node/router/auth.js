const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js');
const Joi = require("joi");
const authToken = require('../utils/authToken')

//REGISTER
router.post('/register', async (req, res) => {
    // const schema = Joi.object({
    //     username: Joi.string().min(3).max(30).required(),
    //     email: Joi.string().min(3).max(100).required().email(),
    //     password: Joi.string().min(6).max(200).required(),
    // });
    // const { error } = schema.validate(req.body);

    // if (error)
    //     return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send("User already exists!");

    const newUser = new User({
        fullname: req.body.fullname,
        address: req.body.address,
        date: req.body.date,
        phone: req.body.phone,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES
            .encrypt(req.body.password,
                process.env.KEY_PASS).toString(),
    })
    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser)
    } catch (error) {
        res.status(201).json(error)
    }
});

//LOGIN
router.post('/login', async (req, res) => {

    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });
    const { error } = schema.validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(401).json('This account does not exist!');

        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.KEY_PASS).toString(CryptoJS.enc.Utf8);
        if (hashPassword !== req.body.password)
            return res.status(401).json("Login information is incorrect");

        //create token
        const accessToken = authToken(user)
        res.status(200).json({ accessToken, user });
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router