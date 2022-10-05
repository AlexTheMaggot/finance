import React, {Component} from "react";


export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
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
                this.setState({data: mydata.content})
            }
        });
    }
    render() {
        return (
            <div className="block">
                <h3>Баланс</h3>
                <h3>{this.state.data.total_balance_uzs} UZS</h3>
                <h3>{this.state.data.total_balance_usd} $</h3>
            </div>
        );
    }
}