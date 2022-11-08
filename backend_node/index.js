const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const productRouter = require('./router/product')
const cartRouter = require('./router/cart')
const orderRouter = require('./router/order')
// const stripeRouter = require('./router/stripe');
const cors = require('cors');
dotenv.config()
app.use(express.json())
app.use(express.json({ limit: '50mb' }));
//connect
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.log('Error connectDB :', err));

app.use(cors());
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
// app.use('/api/checkout', stripeRouter)


app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running with port:', process.env.PORT);
})
