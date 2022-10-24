import React from 'react';
import { Container, Form, Title, Wrapper, Input, Group, Button } from '../styled-components/styledLogin';

const Login = () => {
    return (
        <Container>
            <Wrapper>
                <Title>Login Form</Title>
                <Form>
                    <Input placeholder='user Name' />
                    <Input placeholder='password' />
                    <Group>
                        <span> <Input type='checkbox' /> Remember me</span>
                        <span>Forgot password ?</span>
                    </Group>
                    <Button>LOGIN</Button>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;