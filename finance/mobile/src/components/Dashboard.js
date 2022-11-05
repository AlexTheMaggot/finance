import React, {Component, useState} from "react";
import './Dashboard.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import BalanceChart from "./BalanceChart";


export default class Dashboard extends Component {
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
            <div className="row dashboard">
                <div className="col-12">
                    <div className="row">
                        <div className="block__wrapper">
                            <div className="block">
                                <div className="balance">
                                    <h3 className="balance__title">Баланс</h3>
                                    <div className="balance__wrapper">
                                        <div className="balance__block">
                                            <h3 className="balance__text balance__text_uzs">{this.state.data.UZS} UZS</h3>
                                        </div>
                                        <div className="balance__block">
                                            <h3 className="balance__text balance__text_usd">{this.state.data.USD} $</h3>
                                        </div>
                                    </div>
                                </div>
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