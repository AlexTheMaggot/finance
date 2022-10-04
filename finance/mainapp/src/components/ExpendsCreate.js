import React, {Component} from "react";
import {Navigate, redirect} from "react-router-dom";


export default class ExpendsCreate extends Component {
    constructor(props) {
        super(props);
        let date = new Date();
        date.setSeconds(date.getSeconds() + (3600 * 5));
        date = date.toISOString().split('T')[0];
        this.state = {
            name: '',
            cost: '',
            date: date,
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
                method: 'ExpendsCreate',
                content: {
                    name: this.state.name,
                    cost: this.state.cost,
                    date: this.state.date,
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
            <div className="block">
                {submit && <Navigate to='/' replace={true} />}
                <h3 className='mb-5'>Новый расход</h3>
                <form action="#" className='w-50' onSubmit={this.handleSubmit}>
                    <input required className='form-control mb-3' type="text" name='name' placeholder='Название' value={this.state.name} onChange={this.handleChange}/>
                    <input required className='form-control mb-3' type="number" name='cost' placeholder='Стоимость' value={this.state.cost} onChange={this.handleChange}/>
                    <input required type="date" name='date' className='form-control mb-3' value={this.state.date} onChange={this.handleChange}/>
                    <input type="submit" className='btn btn-success' value='Создать'/>
                </form>
            </div>
        );
    }
}