import React, {Component, useState} from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import BalanceChart from "./BalanceChart";


export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
        };
    }
    componentDidMount() {
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'GetTotalBalance',
            }),
        }).then(data => data.json()).then((mydata) => {
            if (mydata.result ===  'success') {
                this.setState({data: mydata.content});
            }
        });
    }
    render() {
        return (
            <div className="row content">
                <div className="col-lg-7 col-12">
                    <div className="row">
                        <div className="block__wrapper">
                            <div className="block">
                                <h3>Баланс</h3>
                                <h3>{this.state.data.total_balance_uzs} UZS</h3>
                                <h3>{this.state.data.total_balance_usd} $</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-12">
                    <BalanceChart />
                </div>
            </div>
        );
    }
}