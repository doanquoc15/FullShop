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
    const cart = useSelector(state => state.cart);
    const [isLogout, setIsLogout] = useState(false)
    const [drop, setDrop] = useState(false)
    const currentUser = useSelector(state => state.user.currentUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    //handle logout
    const handleLogout = () => {
        dispatch(logoutUser(null))
        setDrop(!drop);
        setIsLogout(true)
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input />
                        <Search />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo onClick={() => navigate('/')}>Clothes.Shop<sup>QD</sup></Logo>
                </Center>
                <Right>
                    {isLogout && (
                        <>
                            <MenuItem onClick={() => handleRegister()}>REGISTER</MenuItem>
                            <MenuItem onClick={() => handleLogin()}>SIGN IN</MenuItem>
                        </>
                    )}

                    {
                        !isLogout && (
                            <Info drop={drop}>
                                <ImgContainer onClick={() => setDrop(!drop)}>
                                    <Image src={currentUser &&  currentUser.user.image} />
                                </ImgContainer>
                                <DropContainer>
                                    <Link
                                        onClick={() => setDrop(!drop)}
                                        to='/cart'>Orders</Link>
                                    <Link
                                        onClick={() => setDrop(!drop)}
                                        to={`/profile/${currentUser && currentUser.user._id}`}>Setting</Link>
                                    <Link
                                        onClick={() => handleLogout()}
                                        to='/'>Logout</Link>
                                </DropContainer>
                                <Name>{currentUser && currentUser.user.username}</Name>
                            </Info>
                        )
                    }
                    <MenuItem>
                        <Badge badgeContent={cart.quantity || '0'} color="primary">
                            <Link to='/cart'>
                                <CartIcon color="action" />
                            </Link>
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;