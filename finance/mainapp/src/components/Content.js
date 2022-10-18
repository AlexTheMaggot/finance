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
                this.show_chart();
            }
        });
    }
    show_chart() {
        const ctx = document.getElementById('myChart');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: '# of Votes',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        console.log(this.state);
        // this.state.balances.map((item) => {
        //     myChart.data.labels.join(item.date);
        //     myChart.data.data.join(item.UZS);
        // });
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
                                <ul>
                                    {this.state.balances_got && this.state.balances.map(item => (
                                            <li><h3>{item.date}: {item.UZS} UZS, {item.USD}$</h3></li>
                                    ))}
                                </ul>
                                <canvas id="myChart" width="400" height="400"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}