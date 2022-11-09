import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'


const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")) : [],
    quantity: 0,
    total: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //add product to cart and add
        addToCart(state, action) {
            const existingIndex = state.cartItems.findIndex(
                item => item._id === action.payload._id
            )

            if (existingIndex >= 0 && state.cartItems[existingIndex].color === action.payload.color && state.cartItems[existingIndex].size === action.payload.size) {
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: state.cartItems[existingIndex].cartQuantity + action.payload.quantity
                };
                toast.success("Product added to cart", {
                    position: "bottom-left",
                });
            }
            else {
                let tempProductItem = { ...action.payload, cartQuantity: action.payload.quantity };
                state.cartItems.push(tempProductItem);
                toast.success("Product added to cart", {
                    position: "bottom-left",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        //decrease cart
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                );

                state.cartItems = nextCartItems;
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        //get total
        getTotal(state, action) {
            let { _total, _quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal._total += itemTotal;
                    cartTotal._quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    _total: 0,
                    _quantity: 0,
                }
            );
            _total = parseFloat(_total.toFixed(2));
            state.quantity = _quantity;
            state.total = _total;
        },

        //remove products
        removeFromCart(state, action) {
            const nextCartItems = []
            state.cartItems.map(cartItem => {
                if (cartItem._id !== action.payload._id && cartItem.color !== action.payload.color && cartItem.size !== action.payload.size) {
                    nextCartItems.push(cartItem)

                    state.cartItems = nextCartItems;

                    toast.error("Product removed from cart", {
                        position: "bottom-left",
                    });
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                return state;
            });
        },
        //clean all
        clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("Cart cleared", { position: "bottom-left" });
        },
    }
})

export const { addToCart, getTotal, decreaseCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;