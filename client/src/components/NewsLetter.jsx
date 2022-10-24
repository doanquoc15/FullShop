import React from 'react';
import { Container, Description, Input, InputContainer, Title, Button } from '../styled-components/styledNewsLetter';
import SendIcon from '@mui/icons-material/Send';
const NewsLetter = () => {
    return (
        <Container>
            <Title>NewsLetter</Title>
            <Description>Get timely updates from your favorite products.</Description>
            <InputContainer>
                <Input placeholder='Your email'/>
                <Button>
                    <SendIcon style={{ fill:'#dbf211'}}/>
                </Button>
            </InputContainer>
        </Container>
    );
};

export default NewsLetter;