import React, { useEffect, useState } from 'react';
import { Amount, AddContainer, AmountContainer, Container, Description, Filter, FilterColor, FilterContainer, FilterSize, FilterSizeOption, FilterTitle, Image, ImageContainer, InfoContainer, Price, Title, Wrapper, Button, Border } from '../styled-components/styledProductDetail';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams } from 'react-router-dom';
import { publicRequest } from '../common/api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from './Loading/Loading';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const [color, setColor] = useState();
    const [size, setSize] = useState();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.user.currentUser.user);
    // console.log(currentUser)
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data)
            } catch (error) {
                console.log('Error : ', error)
            }
            setLoading(false)
        };

        fetchData();
    }, [id]);

    //handle quantity 
    const handleQuantity = (type) => {
        if (type === 'dec') {
            if (quantity >= 2)
                setQuantity(quantity - 1)
            else
                return;
        }
        if (type === 'inc') {
            setQuantity(quantity + 1)
        }
    }
    //handle color
    const handleBorder = (e) => {
        e.target.classList.toggle('active')
    }

    //add to cart
    const handleAddToCart = async () => {
        if (currentUser) {
            if (color && size) {
                dispatch(addToCart({ ...product, userId: currentUser._id, quantity, color, size }));
                navigate('/cart', {
                    state: {
                        color, size
                    }
                })
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
        }
        else {
            navigate('/login')

        }


    }
    return (
        <Container>
            {loading ? <Loading /> : <Wrapper>
                <ImageContainer>
                    <Image src={product && product.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product && product.title}</Title>
                    <Description>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nihil, consectetur reprehenderit deleniti eius fuga assumenda fugiat fugit in rem ipsa itaque expedita ut consequatur ducimus dolor corrupti minus iste?</Description>
                    <Price>$ {product && product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c, index) => (
                                <Border
                                    key={index}
                                    onClick={handleBorder}>
                                    <FilterColor
                                        key={index}
                                        color={c}
                                        onClick={() => setColor(c)}
                                    />
                                </Border>
                            ))}

                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)} >
                                <FilterSizeOption selected disabled>Size</FilterSizeOption>
                                {product.size?.map((s, index) => (
                                    <FilterSizeOption value={s}
                                        key={index}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>

                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon
                                onClick={() => { handleQuantity('dec') }}
                                style={{ cursor: 'pointer' }} />
                            <Amount>{quantity}</Amount>
                            <AddIcon
                                onClick={() => { handleQuantity('inc') }}
                                style={{ cursor: 'pointer' }} />
                        </AmountContainer>
                        <Button onClick={() => handleAddToCart()}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>}
        </Container>
    );
};

export default ProductDetail;