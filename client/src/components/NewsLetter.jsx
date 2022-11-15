import React,{useRef} from 'react';
import { Container, Description, Input, InputContainer, Title, Button } from '../styled-components/styledNewsLetter';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';
const NewsLetter = () => {
    console.log(process.env.SERVICE_ID)
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_xdxn3zk', 'template_h1rg1fv', form.current, 'asp5z2F_sOYLHgJ35')
            .then((result) => {
                console.log(result.text);
                console.log('send message');
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <Container>
            <Title>NewsLetter</Title>
            <Description>Get timely updates from your favorite products.</Description>
            <InputContainer ref={form} onSubmit={sendEmail}>
                <Input placeholder='Your email'/>
                <Button>
                    <SendIcon style={{ fill:'#dbf211'}}/>
                </Button>
            </InputContainer>
        </Container>
    );
};

export default NewsLetter;