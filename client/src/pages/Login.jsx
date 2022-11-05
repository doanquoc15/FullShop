import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/apiCall';
import { Container, Form, Title, Wrapper, Input, Group, Button } from '../styled-components/styledLogin';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isFetching, error } = useSelector(state => state.user)
    //handle login
    const handleSubmit = (e) => {
        e.preventDefault();
        login(dispatch, { email, password })
        !isFetching && navigate('/')
    }
    return (
        <Container>
            <Wrapper>
                <Title>Login Form</Title>
                <Form>
                    <Input
                        onChange={e => setEmail(e.target.value)}
                        placeholder='email' />
                    <Input
                        onChange={e => setPassword(e.target.value)}
                        placeholder='password' type='password' />
                    <Group>
                        <span> <Input type='checkbox' /> Remember me</span>
                        <span>Forgot password ?</span>
                    </Group>
                    <Button
                        disabled={isFetching}
                        onClick={handleSubmit}>LOGIN</Button>
                    {error && <p style={{ marginTop: '15px', color: 'red' }}>Login fail!</p>}
                </Form>
                <span>Not a member ?<Link to='/register'> Sign up</Link></span>
            </Wrapper>
        </Container>
    );
};

export default Login;