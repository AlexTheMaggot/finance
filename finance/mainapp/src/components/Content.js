import React, {Component, useState} from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            balances: '',
            balances_got: false,
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
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'GetTenDaysBalace',
            }),
        }).then(data => data.json()).then((mydata) => {
            if (mydata.result ===  'success') {
                this.setState({balances: mydata.content});
                this.setState({balances_got: true});
                if (this.state.balances_got) {
                    this.show_chart();
                }
            }
        });
    }
    show_chart() {
        let chart_data = {
            labels: [],
            UZS: [],
            USD: [],
        }
        this.state.balances.map((item) => {
            chart_data.labels.push(item.date);
            chart_data.UZS.push(item.UZS);
            chart_data.USD.push(item.USD);
        });
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chart_data.labels,
                datasets: [{
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    label: 'UZS',
                    data: chart_data.UZS,
                    borderColor: '#198754',
                    yAxisID: 'y',
                },
                {
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    label: 'USD',
                    data: chart_data.USD,
                    borderColor: '#0D6EFD',
                    yAxisID: 'y2',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        position: 'left',
                        ticks: {
                            color: '#198754',
                        },
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        ticks: {
                            color: '#0D6EFD',
                        },
                    }
                }
            }
        });
    }
    render() {
        return (
            <div className="row content">
                <div className="col-lg-6 col-12">
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
                <div className="col-lg-6 col-12">
                    <div className="row">
                        <div className="block__wrapper">
                            <div className="block">
                                <h3>Баланс за последние 10 дней</h3>
                                <canvas id="myChart" width="400" height="400"></canvas>
                                {this.state.balances_got && this.show_chart()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}