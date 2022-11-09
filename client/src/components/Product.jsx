import React, { useState } from 'react';
import { Circle, Container, Icon, Image, Info } from '../styled-components/styledProduct';
import { FilterContainer, Filter, FilterTitle, Border, FilterColor, FilterSize, FilterSizeOption } from '../styled-components/styledProduct';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import HeartIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
//
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify';
const Product = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const userId = useSelector(state => state.user.currentUser.user._id)
    const [open, setOpen] = useState(false);

    const handleAddToCart = (product) => {
        if (color && size) {
            dispatch(
                addToCart({ ...product, quantity: 1, color, size, userId })
            );
            navigate('/cart')
        }
        else {
            if (!color && size) {
                toast.warning("Choose color before add to cart!", {
                    position: "bottom-left",
                });
            }
            else if (!size && color) {
                toast.warning("Choose size before add to cart!", {
                    position: "bottom-left",
                });
            }
            else {
                toast.warning("Choose color and size before add to cart!", {
                    position: "bottom-left",
                });
            }
        }

    };
    
    const handleOpen = async () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container >
            <Circle />
            <Image src={product.img} />
            <Info>
                <Icon>
                    <CartIcon variant="outlined"
                        onClick={handleOpen}
                        style={{ fill: 'red' }} />
                </Icon>
                <Icon>
                    <Link to={`/product/${product._id}`}>
                        <SearchIcon style={{ fill: 'red' }} />
                    </Link>
                </Icon>
                <Icon>
                    <HeartIcon style={{ fill: 'red' }} />
                </Icon>
            </Info>
            {/* Handle event choose size and color of product */}
            <Dialog open={open} onClose={handleClose} style={{ minWidth: '500px' }}>
                <DialogTitle>Choose size and color</DialogTitle>
                <DialogContent>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product && product.color.map((c, index) => (
                                <FilterColor
                                    key={index}
                                    color={c}
                                    onClick={() => setColor(c)}
                                />
                            ))}

                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)} >
                                <FilterSizeOption disabled selected>Size</FilterSizeOption>
                                {product && product.size.map((s, index) => (
                                    <FilterSizeOption value={s}
                                        key={index}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleAddToCart(product)}>Add To Cart</Button>
                    <Button onClick={handleClose} >Close</Button>
                </DialogActions>
            </Dialog>
        </Container >
    );
};

export default Product;