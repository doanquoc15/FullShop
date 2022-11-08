import React, { useEffect, useState } from 'react';
import {
    Container,
    SummaryTitlePrice,
    Wrapper,
    Title,
    Top,
    Bottom,
    Hr,
    ProductAmount,
    TopButton,
    TopTexts,
    Image,
    TopText,
    Info,
    Summary,
    Product,
    ProductDetail,
    PriceDetail,
    Details,
    ProductName,
    ProductId,
    ProductColor,
    ProductSize,
    ProductAmountContainer,
    ProductPrice,
    SummaryTitle,
    SummaryItem,
    SummaryTitleText,
    Button,
    Clean
} from '../styled-components/styledCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { addToCart, decreaseCart, getTotal, removeFromCart, clearCart } from '../redux/cartSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from '@mui/icons-material/Person2Outlined';
import Address from '@mui/icons-material/LocationOnOutlined';
import Phone from '@mui/icons-material/SmartphoneOutlined';
import Card from '@mui/icons-material/CreditCardOutlined';
import '../assets/cart.css'
const Cart = () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [card, setCard] = useState('')
    const [date, setDate] = useState('')
    const [cvc, setCVC] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    //cap nhat price total
    useEffect(() => {
        dispatch(getTotal(null))
    }, [cart, dispatch]);

    //handle decrease cart
    const handleDecreaseCart = cartItem => {
        dispatch(decreaseCart(cartItem));
    }

    //handle increase cart
    const handleIncreaseCart = cartItem => {
        dispatch(addToCart({ ...cartItem, quantity: 1 }));
    }

    //remove products from cart
    const handleRemoveFromCart = cartItem => {
        dispatch(removeFromCart(cartItem))
    }

    //Dialog
    const handleOpen = async () => {
        setOpen(true);


    }
    const handleClose = () => {
        setOpen(false);
    };

    const handlePayment = () => {
        navigate("/success", {
            state: {
                cart,
                stripeData: {
                    name, address, phone, card, date, cvc
                }
            }
        });
    }
    return (
        <Container>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to='/'>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shopping Bag(4)</TopText>
                        <TopText>Your Wishlist(2)</TopText>
                    </TopTexts>
                    <TopButton>CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {
                            cart.cartItems.map(product => (
                                <>
                                    <Product key={product._id}>
                                        <ProductDetail>
                                            <Image src={product.img} />
                                            <Details>
                                                <ProductName><b>Product</b>{product.title}</ProductName>
                                                <ProductId><b>ID</b>{product._id}</ProductId>
                                                <ProductId><b>Color</b> <ProductColor color={product.color} /></ProductId>
                                                <ProductSize><b>Size</b>{product.size}</ProductSize>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <RemoveIcon onClick={() => handleDecreaseCart(product)} />
                                                <ProductAmount>{product.cartQuantity}</ProductAmount>
                                                <AddIcon onClick={() => handleIncreaseCart(product)} />
                                            </ProductAmountContainer>
                                            <ProductPrice>$ {parseFloat((product.price * product.cartQuantity).toFixed(2))}</ProductPrice>
                                            <Clean onClick={() => handleRemoveFromCart(product)}>Clear product</Clean>
                                        </PriceDetail>
                                    </Product>
                                    <Hr />
                                </>
                            ))
                        }
                    </Info>

                    <Summary>
                        <SummaryTitle>order summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryTitleText>Subtotal</SummaryTitleText>
                            <SummaryTitlePrice>${cart.total}</SummaryTitlePrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryTitleText>Estimated Shipping</SummaryTitleText>
                            <SummaryTitlePrice>$4.5</SummaryTitlePrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryTitleText>Shipping Discount</SummaryTitleText>
                            <SummaryTitlePrice>$-4.5</SummaryTitlePrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryTitleText type='total'>Total</SummaryTitleText>
                            <SummaryTitlePrice>${cart.total}</SummaryTitlePrice>
                        </SummaryItem>
                        {/* d */}
                        <Dialog open={open} onClose={handleClose} style={{ minWidth: '500px' }}>
                            <DialogTitle>
                                <div className="dialog_image">
                                    <img src="https://www.pngitem.com/pimgs/m/291-2918799_stripe-payment-icon-png-transparent-png.png" alt="" />
                                </div>
                            </DialogTitle>
                            <DialogContent>
                                <div className="dialog-container payment_info">
                                    <h4>Information</h4>
                                    <div className="group name">
                                        <PersonIcon />
                                        <input
                                            onChange={e => setName(e.target.value)}
                                            type="text" placeholder="Full name" />
                                    </div>
                                    <div className="group address">
                                        <Address />
                                        <input
                                            onChange={e => setAddress(e.target.value)}
                                            type="text" placeholder="Address" />
                                    </div>
                                    <div className="group phone">
                                        <Phone />
                                        <input
                                            onChange={e => setPhone(e.target.value)}
                                            type="phone" placeholder="+(84) 906 410 601" />
                                    </div>
                                    <h4>Payment</h4>
                                    <div className="group card">
                                        <Card />
                                        <input
                                            onChange={e => setCard(e.target.value)}
                                            type="text" placeholder="1234 1234 1234 1234" />
                                    </div>
                                    <div className="payment-info group">
                                        <input
                                            onChange={e => setDate(e.target.value)}
                                            type="date" placeholder='MM/YY' />
                                        <input
                                            onChange={e => setCVC(e.target.value)}
                                            type="text" placeholder="CVC" />
                                    </div>

                                    <div className="total">Your total price : <span>${parseFloat(cart.total.toFixed(2))}</span></div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button style={{ width: "70%", margin: '0 auto' }} onClick={() => handlePayment()} >Payment</Button>
                            </DialogActions>
                        </Dialog>
                        <Button onClick={handleOpen}>Checkout payment</Button>
                    </Summary>
                </Bottom>
                {
                    cart.cartItems.length > 0 ? (<Button onClick={() => dispatch(clearCart())}>clean all</Button>) : ''
                }

            </Wrapper>
        </Container>
    );
};

export default Cart;