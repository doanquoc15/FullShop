import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { userRequest } from "../common/api";
const Success = () => {
	const location = useLocation();
	const data = location.state.stripeData;
	const cart = location.state.cart;
	const customer = location.state.customer;
	const navigate = useNavigate();
	const currentUser = useSelector((state) => state.user.currentUser);
	const [orderId, setOrderId] = useState(null);
	console.log('cart', data)
	useEffect(() => {
		const createOrder = async () => {
			try {
				const res = await userRequest.post("/orders", {
					userId: currentUser.user._id,
					products: cart.map((item) => ({
						productId: item._id,
						quantity: item.quantity,
					})),
					amount: cart.reduce((total, curr) => (total + curr.price * curr.quantity), 0),
					address: data.address,
				});
				setOrderId(res.data._id);
			} catch (error) {
				console.log(error);
			}
		};

		createOrder();
	}, [cart, data, currentUser]);


	useEffect(() => {
		const postCustomer = async () => {
			try {
				const res = await userRequest.post('/customers', customer);
			} catch (error) {
				console.log(error);
			}
		};

		postCustomer();
	}, [customer, currentUser]);
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
			{orderId ? (
				<div className="success-container">
					Order successfully!
				</div>
			) : (
				`Successfull. Your order is being prepared...`
			)}
			<button
				style={{ padding: 10, marginTop: 20 }}
				onClick={() => navigate("/")}
			>
				Homepage
			</button>
		</div>
	);
};

export default Success;
