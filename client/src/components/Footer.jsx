import React from 'react';
import { Center, Container, Description, Left, Logo, Right, SocialContainer, SocialIcon, Title, List, ListItem, ContactItem, Payment } from '../styled-components/styledFooter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Clothes.Shop<sup>QD</sup></Logo>
                <Description>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt rem ab porro reprehenderit est vel.Magnam odit mollitia
                    dignissimos! Accusantium quam neque nobis aliquid quas aliquam, libero nam numquam id!
                </Description>
                <SocialContainer>
                    <SocialIcon color='0066FF'>
                        <FacebookIcon style={{ fill: 'white' }} />
                    </SocialIcon>
                    <SocialIcon color='CC0000' >
                        <InstagramIcon style={{ fill: 'white' }} />
                    </SocialIcon>
                    <SocialIcon color='0099FF' >
                        <TwitterIcon style={{ fill: 'white' }} />
                    </SocialIcon>
                    <SocialIcon color='FF0000' >
                        <PinterestIcon style={{ fill: 'white' }} />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Link</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Women Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>WishList</ListItem>
                    <ListItem>Terms</ListItem>
                    <ListItem>Contact</ListItem>
                    <ListItem>Help </ListItem>

                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><RoomIcon style={{marginRight:'10px'}}/> K104/6A, Thuan Phuoc, Hai Chau, Da Nang</ContactItem>
                <ContactItem><PhoneIcon style={{ marginRight: '10px' }} /> +(84) 967 410 601</ContactItem>
                <ContactItem><MailIcon style={{ marginRight: '10px' }} /> quocdoan19t2@hmail.com</ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    );
};

export default Footer;