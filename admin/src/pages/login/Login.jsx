import React,{useState} from 'react';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './login.css'
import { login } from '../../redux/apiCall';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        login(dispatch, { email, password },navigate);
    }
    return (
        <div className="container-lg">
            <span className='circle'></span>
            <div className="login-form">
                <div className="person">
                    <PersonIcon/>
                </div>
                <form >
                    <div className="group-container">
                        <EmailIcon/>
                        <input
                            onChange = {e => setEmail(e.target.value)}
                            placeholder='quocdoan@gmail.com'
                            type="email" />
                    </div>
                    <div className="group-container group-pass">
                        <VpnKeyIcon/>
                        <input
                            onChange = {e => setPassword(e.target.value)}
                            style={{ fontWeight: '800', fontFamily:'Courier'}}
                            type='password' />
                        <VisibilityOffIcon />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="btn-submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;