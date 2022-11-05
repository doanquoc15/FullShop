import React from "react";
import "./topbar.css";
import NotificationsNone from '@mui/icons-material/NotificationsNone';
import Language from '@mui/icons-material/Language';
import Settings from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from "../../redux/authSlice";
import { Link } from "react-router-dom";
export default function TopBar() {
    const auth = useSelector(state => state.user.currentUser.user)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser(null))
    }
    return (
        <div className="TopBar">
            <div className="TopBarWrapper">
                <div className="topLeft">
                    <span className="logo">Clothes.Shop<sup style={{ fontSize: '12px' }}>QD-Admin</sup></span>
                </div>
                {
                    auth ? (<>
                        <div className="topRight">
                            <div className="TopBarIconContainer">
                                <NotificationsNone />
                                <span className="topIconBadge">2</span>
                            </div>
                            <div className="TopBarIconContainer">
                                <Language />
                                <span className="topIconBadge">2</span>
                            </div>
                            <div className="TopBarIconContainer">
                                <Settings />
                            </div>
                            <div className="infoContainer">
                                <div className="topAvatar">
                                    <img src={auth && auth.image} alt="" />
                                </div>
                                <div className="name">{auth.username}</div>
                                <button
                                    onClick={() => handleLogout()}
                                    className="logout">Logout</button>
                            </div>
                        </div>
                    </>) : <Link to='/login' className='login'>Login</Link>
                }

            </div>
        </div>
    );


}
