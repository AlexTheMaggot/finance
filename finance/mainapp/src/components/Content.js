import React, {Component} from "react";
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
            }
        });
    }
    render() {
        // const ctx = document.createElement('<canvas id="myChart" width="400" height="400"></canvas>');
        const ctx = document.createElement('canvas', {'id':'myChart','width':'400','height':'400',});

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
                                {ctx}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}