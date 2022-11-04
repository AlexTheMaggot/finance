import React, {Component} from "react";
import {Navigate} from "react-router-dom";


export default class ExpensesCreate extends Component {
    constructor(props) {
        super(props);
        let date = new Date();
        date.setSeconds(date.getSeconds() + (3600 * 5));
        date = date.toISOString().split('T')[0];
        this.state = {
            name: '',
            cost: '',
            date: date,
            currency: 'UZS',
            submit: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        const response = fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'ExpensesCreate',
                content: {
                    name: this.state.name,
                    cost: this.state.cost,
                    date: this.state.date,
                    currency: this.state.currency,
                },
            }),
        }).then((data) => {return data.json()}).then((mydata) => {
            if (mydata.result ===  'success') {
                this.setState({submit: true});
            }
        })
    }
    render() {
        let submit = this.state.submit;
        return (
            <div className="row content">
                <div className="block__wrapper">
                    <div className="block">
                        {submit && <Navigate to='/' replace={true} />}
                        <h3 className='mb-5'>Новый расход</h3>
                        <form action="#" className='w-50' onSubmit={this.handleSubmit}>
                            <input required className='form-control mb-3' type="text" name='name' placeholder='Название' value={this.state.name} onChange={this.handleChange}/>
                            <input required className='form-control mb-3' type="number" name='cost' placeholder='Стоимость' value={this.state.cost} onChange={this.handleChange}/>
                            <input required type="date" name='date' className='form-control mb-3' value={this.state.date} onChange={this.handleChange}/>
                            <select name="currency" className='form-select' onChange={this.handleChange} defaultValue='UZS'>
                                <option value="UZS">UZS</option>
                                <option value="USD">USD</option>
                            </select>
                            <input type="submit" className='btn btn-success' value='Создать'/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}