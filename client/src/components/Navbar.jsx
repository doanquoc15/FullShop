import React from 'react';
import Search from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Container, Language, Left, Right, Center, Wrapper, SearchContainer, Input, Logo, MenuItem } from '../styled-components/styledNavbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar = () => {
    const cart = useSelector(state => state.cart);
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
                    <Logo>Clothes.Shop<sup>QD</sup></Logo>

                </Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
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