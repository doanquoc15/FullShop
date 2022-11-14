import React, { useEffect, useState } from 'react';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import "./featuredInfo.css";
import { userRequest } from '../../requestMethods';

export default function FeaturedInfo() {
    const [income, setIncome] = useState([]);
    const [percentOrder, setPercentOrder] = useState(0);
    const [percentSale, setPercentSale] = useState(0);
    const [percentUser, setPercentUser] = useState(0);
    const [incomeUser, setIncomeUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userRequest.get('/orders/income');
                setIncome(res.data);
                setPercentOrder(res.data[1].total * 100 / res.data[0].total - 100);
                setPercentSale(((res.data[0].count - res.data[1].count) / res.data[1].count) * 100)
            } catch (error) {
                console.error('Error', error)
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const res = await userRequest.get('/users/income');
                setIncomeUser(res.data)
                setPercentUser(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
            } catch (error) {
                console.error(error)
            }
        };
        fetchDataUser();
    }, [])
    console.log(income)
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">${income.length !== 0 && income.total}</span>
                    <span className="featuredMoneyRate">
                        {parseFloat(percentOrder).toFixed(1)}%
                        {percentOrder < 0 ? < ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{income.length !== 0 && income[0].count}</span>
                    <span className="featuredMoneyRate">
                        {parseFloat(percentSale).toFixed(1)}%
                        {percentSale < 0 ? < ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}

                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">User</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{incomeUser.length !== 0 && incomeUser[0].total}</span>
                    <span className="featuredMoneyRate">
                        {parseFloat(percentUser).toFixed(1)}%
                        {percentUser < 0 ? < ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
}
