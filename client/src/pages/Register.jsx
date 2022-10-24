import React from 'react';
import { Container, Title, Wrapper, Form, Input, Agreement, Button, Group } from '../styled-components/styledRegister';
import AddIcon from '@mui/icons-material/Add';

const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Form>
                    <Title>REGISTER ACCOUNT</Title>
                    <Group>
                        <Input placeholder='name' />
                        <Input placeholder='last name' />
                    </Group>
                    <Input placeholder='user name' />
                    <Input placeholder='email' />
                    <Input placeholder='password' />
                    <Input placeholder='confirm password' />
                    <Agreement><Input type='checkbox' />I agree with the <span> &nbsp; Terms and Conditions &nbsp;</span> and the &nbsp;<span>Privacy Policy</span></Agreement>
                    <Button>CREATE ACCOUNT</Button>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
