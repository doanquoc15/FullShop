// const router = require("express").Router();
// const KEY = process.env.STRIPE_SEC_KEY
// const Stripe = require('stripe');
// const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
// const stripe = Stripe(KEY);



// router.post("/", verifyTokenAndAdmin, async (req, res) => {
//     await stripe.charges.create(
//         {
//             source: req.body.tokenId,
//             amount: req.body.amount,
//             currency: "usd",
//         },

//         (stripeErr, stripeRes) => {
//             if (stripeErr) {
//                 res.status(500).json(stripeErr);
//             } else {
//                 res.status(200).json(stripeRes);
//             }
//         }
//     );
// });

// module.exports = router;