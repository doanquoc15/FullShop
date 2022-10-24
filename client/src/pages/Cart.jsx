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
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../common/api';


const Cart = () => {
    const KEY = process.env.REACT_APP_STRIPE;
    const [stripeToken, setStripeToken] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

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
        dispatch(addToCart(cartItem));
    }

    //remove products from cart
    const handleRemoveFromCart = cartItem => {
        dispatch(removeFromCart(cartItem))
    }

    //stripe onToken
    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: 500,
                });
                navigate.push("/success", {
                    stripeData: res.data,
                    products: cart,
                });
            } catch { }
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, navigate]);
    console.log('stripeToken',stripeToken)
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
                                    <Product>
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
                        {/* stripe checkout */}
                        <StripeCheckout
                            name='clothes.Shop'
                            img='../images/logo.jpg'
                            billingAddress
                            shippingAddress
                            description={`Your total is ${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY || process.env.REACT_APP_STRIPE}
                        >
                            <Button>checkout now</Button>
                        </StripeCheckout>
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