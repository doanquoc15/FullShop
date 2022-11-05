import "./widgetSm.css";
import Visibility from '@mui/icons-material/Visibility';
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from '../../requestMethods'

export default function WidgetSm() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userRequest.get('users/?new=true');
                setUsers(res.data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [])

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">

                {
                    users.map(user => (
                        <li className="widgetSmListItem" key={user.id}>
                            <div className="widgetSmItemLeft">
                                <img
                                    src={user.image}
                                    alt=""
                                    className="widgetSmImg"
                                />
                                <div className="widgetSmUser">
                                    <span className="widgetSmUsername">{user.username}</span>
                                    <span className="widgetSmUserTitle">{user.email}</span>
                                </div>
                            </div>
                            <button className="widgetSmButton">
                                <Visibility className="widgetSmIcon" />
                                Display
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
