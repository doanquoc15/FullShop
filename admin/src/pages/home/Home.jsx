import { useState, useMemo, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../adminData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userRequest } from "../../requestMethods";
export default function Home() {
    const [state, setUserState] = useState([])
    const months = useMemo(() => [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userRequest.get('/users/stats');
                res.data.map(item => setUserState(prev => [
                    ...prev,
                    { name: months[item._id - 1], "Active User": item.total }
                ]))
            } catch (error) {
                console.log('Error',error)
            }
        };

        fetchData();
    }, [])

    console.log(state)
    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={state} title="User Analytics" grid dataKey="Active User" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}
