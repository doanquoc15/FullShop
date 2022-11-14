import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/apiCall';
import moment from 'moment';
import { Container, Title, Wrapper, Form, Input, Agreement, Button, Group } from '../styled-components/styledRegister';
const Register = () => {
    const navigate = useNavigate()
    const [fullname, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [confirmpassword, setConfirmPassword] = useState('')

    const handleRegister = (e) => {
        e.preventDefault();
        if (password === confirmpassword) {
            register({ username, email, password, fullname, address, phone, date: moment(date).format('YYYY-MM-DD') });
            navigate('/login')
        }
        else {
            setIsRegister(true)
        }
    }
    return (
        <Container>
            <Wrapper>
                <Form onSubmit={handleRegister}>
                    <Title>REGISTER ACCOUNT</Title>
                    <Input
                        onChange={e => setFullName(e.target.value)}
                        placeholder='full name' />
                    <Input
                        onChange={e => setAddress(e.target.value)}
                        placeholder='address' />
                    <Input
                        onChange={e => setPhone(e.target.value)}
                        type='phone'
                        placeholder='phone number' />
                    <Input
                        onChange={e => setDate(e.target.value)}
                        type='date'
                        placeholder='date of birth' />
                    <Input
                        onChange={e => setUserName(e.target.value)}
                        placeholder='user name' />
                    <Input
                        onChange={e => setEmail(e.target.value)}
                        type='email'
                        placeholder='email' />
                    <Input
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                        placeholder='password' />
                    <Input
                        onChange={e => setConfirmPassword(e.target.value)}
                        type='password'
                        placeholder='confirm password' />
                    <Agreement><Input type='checkbox' />I agree with the <span> &nbsp; Terms and Conditions &nbsp;</span> and the &nbsp;<span>Privacy Policy</span></Agreement>
                    <Button>CREATE ACCOUNT</Button>
                    {isRegister && <p style={{ marginTop: '20px', color: 'red' }}>Password and confirm Password not match!</p>}
                    {isRegister && <p>Register successfully!</p>}
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
