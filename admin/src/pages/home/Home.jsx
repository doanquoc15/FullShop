import { useState, useMemo, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userRequest } from "../../requestMethods";
export default function Home() {
    const [userStats, setUserStats] = useState([])
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
                res.data.map(item => setUserStats(prev => [
                    ...prev,
                    { name: months[item._id - 1], "Active User": item.total }
                ]))
            } catch (error) {
                console.log('Error',error)
            }
        };

        fetchData();
    }, [])

    

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}
