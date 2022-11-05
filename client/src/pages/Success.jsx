import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { userRequest } from "../common/api";
const Success = () => {
    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    userId: currentUser.user._id,
                    products: cart.cartItems.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                    amount: cart.total,
                    address: data.address,
                });
                setOrderId(res.data._id);
            } catch (error) {
                console.log(error)
            }
        };


        createOrder();
    }, [cart, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? (
                    <div className="success-container">
                        <h4>Customer</h4>
                        <div>Id Customer : <span>{currentUser.user._id}</span></div>
                        <div>Address : <span>{data.address}</span></div>
                        <div>Phone : <span>{data.phone}</span></div>
                        <div>Date Of Birth : <span>{data.date}</span></div>
                        <h4>Card Payment</h4>
                        <div>Card Number : <span>{data.card}</span></div>
                        <div>CVC Number : <span>{data.cvc}</span></div>
                        <h4>Orders</h4>
                        {cart.cartItems.map(item => (
                            <></>
                        ))}
                    </div>
                )
                    : `Successfull. Your order is being prepared...`}
            <button style={{ padding: 10, marginTop: 20 }} onClick={()=>navigate('/')}>Homepage</button>
        </div>
    );
};

export default Success;