import React, {Component, useState} from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export default class BalanceChart extends Component {
    constructor(props) {
        super(props);
        this.update_chart = this.update_chart.bind(this);
        this.state = {
            balances: '',
            chart: '',
        };
        this.myChart = '';
    }
    componentDidMount() {
        this.get_balance(10);
    }
    get_balance(days) {
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'GetBalanceList',
                content: {
                    days: days,
                },
            }),
        }).then(data => data.json()).then((mydata) => {
            if (mydata.result ===  'success') {
                this.setState({balances: mydata.content}, () => {
                    this.show_chart();
                });
            }
        });
    }
    show_chart() {
        let chart_data = {
            labels: [],
            UZS: [],
            USD: [],
        };
        this.state.balances.map((item) => {
            chart_data.labels.push(item.date);
            chart_data.UZS.push(item.UZS);
            chart_data.USD.push(item.USD);
        });
        const ctx = document.getElementById('myChart');
        this.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chart_data.labels,
                datasets: [{
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    label: 'UZS',
                    data: chart_data.UZS,
                    borderColor: '#0D2F7E',
                    yAxisID: 'y',
                },
                {
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    label: 'USD',
                    data: chart_data.USD,
                    borderColor: '#4F6029',
                    yAxisID: 'y2',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        position: 'left',
                        ticks: {
                            color: '#0D2F7E',
                        },
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        ticks: {
                            color: '#4F6029',
                        },
                    }
                }
            }
        });
    }
    update_chart(days) {
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'GetBalanceList',
                content: {
                    days: days,
                },
            }),
        }).then(data => data.json()).then((mydata) => {
            if (mydata.result ===  'success') {
                this.setState({balances: mydata.content});
                $('#myChart').css('opacity', '0');
                setTimeout(() => {
                    let chart_data = {
                        labels: [],
                        UZS: [],
                        USD: [],
                    };
                    this.state.balances.map((item) => {
                        chart_data.labels.push(item.date);
                        chart_data.UZS.push(item.UZS);
                        chart_data.USD.push(item.USD);
                    });
                    this.myChart.data.labels = chart_data.labels;
                    this.myChart.data.datasets[0].data = chart_data.UZS;
                    this.myChart.data.datasets[1].data = chart_data.USD;
                    this.myChart.update();
                    setTimeout(() => {
                        $('#myChart').css('opacity', '1');
                    }, 1000);
                }, 300);
            }
        });
    }
    render() {
        return (
            <div className="row">
                <div className="block__wrapper">
                    <div className="block">
                        <h3>Баланс за последнее время</h3>
                        <canvas id="myChart" className='balance-chart' width="400" height="400"></canvas>
                        <button className='btn btn-dark' onClick={() => this.update_chart(10)} >10 дней</button>
                        <button className='btn btn-dark' onClick={() => this.update_chart(30)} >30 дней</button>
                        <button className='btn btn-dark' onClick={() => this.update_chart(90)} >90 дней</button>
                    </div>
                </div>
            </div>
        );
    }
}