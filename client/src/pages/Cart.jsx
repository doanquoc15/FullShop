import React, { useEffect, useState } from "react";
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
    Clean,
} from "../styled-components/styledCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    decreaseCart,
    getTotal,
    removeFromCart,
    clearCart,
    addToCart
} from "../redux/cartSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PersonIcon from "@mui/icons-material/Person2Outlined";
import Address from "@mui/icons-material/LocationOnOutlined";
import Phone from "@mui/icons-material/SmartphoneOutlined";
import Card from "@mui/icons-material/CreditCardOutlined";
import Loading from "./Loading/Loading";
import moment from 'moment'
import { userRequest } from "../common/api";
import { useLocation } from "react-router";
import "../assets/cart.css";
const Cart = () => {
    const user = useSelector((state) => state.user.currentUser.user)
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user.fullname);
    const [address, setAddress] = useState(user.address);
    const [phone, setPhone] = useState(user.phone);
    const [card, setCard] = useState();
    const [date, setDate] = useState(user.date);
    const [cvc, setCVC] = useState("");
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.cartItems);
    const userId = useSelector((state) => state.user.currentUser.user?._id)
    const cartOfUser = cart.filter(item => item.userId === userId);
    const totalPrice = cartOfUser.reduce((total, currentCart) => total + currentCart.cartQuantity * currentCart.price, 0)
    const color = location.state?.color;
    const size = location.state?.size
    //cap nhat price total
    useEffect(() => {
        setLoading(true);
        dispatch(getTotal(null));
        setLoading(false);
    }, [cart, dispatch]);

    //handle decrease cart
    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem));
    };

    //handle increase cart
    const handleIncreaseCart = (cartItem) => {
        dispatch(addToCart({ ...cartItem, quantity: 1 }))
    };

    //remove products from cart
    const handleRemoveFromCart = (cartItem, color, size) => {
        dispatch(removeFromCart(cartItem, color, size));
    };

    //Dialog
    const handleOpen = async () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const customer = {
        userId,
        fullname: name,
        address,
        phone,
        card,
        date: moment(date).format('YYYY-MM-DD'),
        cvc,
        amount: totalPrice
    }
    const handlePayment = async () => {

        navigate("/success", {
            state: {
                cart: cartOfUser,
                stripeData: {
                    name,
                    address,
                    phone,
                    card,
                    date: moment(date).format('YYYY-MM-DD'),
                    cvc,
                },
                customer: customer
            },
        });

    };
    return (
        <Container>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to="/">
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shopping Bag(4)</TopText>
                        <TopText>Your Wishlist(2)</TopText>
                    </TopTexts>
                    <TopButton onClick={handleOpen}>CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Info>
                            {cartOfUser.map((product) => (
                                <>
                                    <Product key={product._id}>
                                        <ProductDetail>
                                            <Image src={product.img} />
                                            <Details>
                                                <ProductName>
                                                    <b>Product</b>
                                                    {product.title}
                                                </ProductName>
                                                <ProductId>
                                                    <b>ID</b>
                                                    {product._id}
                                                </ProductId>
                                                <ProductId>
                                                    <b>Color</b>{" "}
                                                    <ProductColor
                                                        color={product.color}
                                                    />
                                                </ProductId>
                                                <ProductSize>
                                                    <b>Size</b>
                                                    {product.size}
                                                </ProductSize>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <RemoveIcon
                                                    onClick={() =>
                                                        handleDecreaseCart(
                                                            product
                                                        )
                                                    }
                                                />
                                                <ProductAmount>
                                                    {product.cartQuantity}
                                                </ProductAmount>
                                                <AddIcon
                                                    onClick={() =>
                                                        handleIncreaseCart(
                                                            product
                                                        )
                                                    }
                                                />
                                            </ProductAmountContainer>
                                            <ProductPrice>
                                                ${" "}
                                                {parseFloat(
                                                    (product.cartQuantity * product.price).toFixed(2)
                                                )}
                                            </ProductPrice>
                                            <Clean
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        { product, color, size }
                                                    )
                                                }
                                            >
                                                Clear product
                                            </Clean>
                                        </PriceDetail>
                                    </Product>
                                    <Hr />
                                </>
                            ))}
                        </Info>
                    )}

                    <Summary>
                        <SummaryTitle>order summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryTitleText>Subtotal</SummaryTitleText>
                            <SummaryTitlePrice>${cart.total}</SummaryTitlePrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryTitleText>
                                Estimated Shipping
                            </SummaryTitleText>
                            <SummaryTitlePrice>$4.5</SummaryTitlePrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryTitleText>
                                Shipping Discount
                            </SummaryTitleText>
                            <SummaryTitlePrice>$-4.5</SummaryTitlePrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryTitleText type="total">
                                Total
                            </SummaryTitleText>
                            <SummaryTitlePrice> ${parseFloat(totalPrice.toFixed(2))}</SummaryTitlePrice>
                        </SummaryItem>
                        {/* d */}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            style={{ minWidth: "500px" }}
                        >
                            {
                                cart.length == 0 ? (<><h1 style={{ padding: '2rem 5rem' }}>Cart empty !</h1>
                                    <DialogActions>
                                        <Button
                                            style={{ width: "70%", margin: "0 auto" }}
                                            onClick={handleClose}
                                        >
                                            Close
                                        </Button>
                                    </DialogActions></>
                                ) : <>
                                    <DialogTitle>
                                        <div className="dialog_image">
                                            <img
                                                src="https://www.pngitem.com/pimgs/m/291-2918799_stripe-payment-icon-png-transparent-png.png"
                                                alt=""
                                            />
                                        </div>
                                    </DialogTitle>
                                    <DialogContent>
                                        <div className="dialog-container payment_info">
                                            <h4>Information</h4>
                                            <div className="group name">
                                                <PersonIcon />
                                                <input
                                                    value={user.fullname}
                                                    onChange={(e) =>
                                                        setName(user.fullname)
                                                    }
                                                    type="text"
                                                    placeholder="Full name"
                                                />
                                            </div>
                                            <div className="group address">
                                                <Address />
                                                <input
                                                    value={user.address}
                                                    onChange={(e) =>
                                                        setAddress(user.address)
                                                    }
                                                    type="text"
                                                    placeholder="Address"
                                                />
                                            </div>
                                            <div className="group phone">
                                                <Phone />
                                                <input
                                                    value={user.phone}
                                                    onChange={(e) =>
                                                        setPhone(user.phone)
                                                    }
                                                    type="phone"
                                                    placeholder="+(84) 906 410 601"
                                                />
                                            </div>
                                            <h4>Payment</h4>
                                            <div className="group card">
                                                <Card />
                                                <input
                                                    onChange={(e) =>
                                                        setCard(e.target.value)
                                                    }
                                                    type="text"
                                                    placeholder="1234 1234 1234 1234"
                                                />
                                            </div>
                                            <div className="payment-info group">
                                                <input
                                                    value={user.date}
                                                    onChange={(e) =>
                                                        setDate(user.date)
                                                    }
                                                    type="date"
                                                    placeholder="MM/YY"
                                                />
                                                <input
                                                    onChange={(e) =>
                                                        setCVC(e.target.value)
                                                    }
                                                    type="text"
                                                    placeholder="CVC"
                                                />
                                            </div>

                                            <div className="total">
                                                Your total price :{" "}
                                                <span>
                                                    ${parseFloat(totalPrice.toFixed(2))}
                                                </span>
                                            </div>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            style={{ width: "70%", margin: "0 auto" }}
                                            onClick={() => handlePayment()}
                                        >
                                            Payment
                                        </Button>
                                    </DialogActions></>
                            }

                        </Dialog>
                        <Button onClick={handleOpen}>Checkout payment</Button>
                    </Summary>
                </Bottom>
                {cartOfUser.length > 0 ? (
                    <Button onClick={() => dispatch(clearCart())}>
                        clean all
                    </Button>
                ) : (
                    ""
                )}
            </Wrapper>
        </Container>
    );
};

export default Cart;
