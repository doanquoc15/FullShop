import React, { useState } from 'react';
import Search from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
    Container,
    Language,
    Left, Right,
    Center,
    Wrapper,
    SearchContainer,
    Input,
    Logo,
    MenuItem,
    Info,
    Image,
    Name,
    ImgContainer,
    DropContainer
} from '../styled-components/styledNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice.js'

const Navbar = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const userId = currentUser.user?._id
    const cart = useSelector(state => state.cart.cartItems.filter(item => item.userId === userId));
    const total = cart?.reduce((total, curr)=>curr.cartQuantity + total,0)
    const [isLogout, setIsLogout] = useState(null)
    const [drop, setDrop] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogin = () => {
        navigate('/login')
        setIsLogout(false);
    }

    //handle logout
    const handleLogout = () => {
        dispatch(logoutUser(null))
        setDrop(!drop);
        setIsLogout(true);
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search key...' />
                        <Search />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo onClick={() => navigate('/')}>Clothes.Shop<sup>QD</sup></Logo>
                </Center>
                <Right>
                    {!userId ?
                        (<>
                            <MenuItem onClick={() => handleRegister()}>REGISTER</MenuItem>
                            <MenuItem onClick={() => handleLogin()}>SIGN IN</MenuItem>
                        </>)
                        :
                        (<>
                            <Info drop={drop}>
                                <ImgContainer onClick={() => setDrop(!drop)}>
                                    <Image src={currentUser.user?.image} />
                                </ImgContainer>
                                <DropContainer>
                                    <Link
                                        onClick={() => setDrop(!drop)}
                                        to='/cart'>Orders</Link>
                                    <Link
                                        onClick={() => setDrop(!drop)}
                                        to={`/profile/${currentUser.user?._id}`}>Setting</Link>
                                    <Link
                                        onClick={() => handleLogout()}
                                        to='/'>Logout</Link>
                                </DropContainer>
                                <Name>{currentUser.user?.username}</Name>
                            </Info>
                            <MenuItem>
                                <Badge badgeContent={total || '0'} color="primary">
                                    <Link to='/cart'>
                                        <CartIcon color="action" />
                                    </Link>
                                </Badge>
                            </MenuItem>
                        </>)
                    }
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;