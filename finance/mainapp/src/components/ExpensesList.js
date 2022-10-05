import React, {Component} from 'react';

export default class ExpensesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.delete_expense = this.delete_expense.bind(this)
    }
    componentDidMount() {
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'ExpensesList',
            }),
        }).then(data => data.json()).then((mydata) => {
            if (mydata.result ===  'success') {
                this.setState({data: mydata.content})
            }
        });
    }
    delete_expense(id) {
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'ExpensesDelete',
                content: {
                    id: id,
                },
            }),
        }).then(data => data.json()).then((mydata) => {
            if (mydata.result ===  'success') {
                this.componentDidMount()
            }
        });

    }

    render () {
        return (
            <div className="block">
                <h3 className='mb-5'>Список расходов</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Дата</th>
                        <th scope="col">Название</th>
                        <th scope="col">Цена</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(item => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.name}</td>
                                <td>{item.cost}</td>
                                <td></td>
                                <td><button className='btn btn-danger' onClick={(e) => this.delete_expense(item.id, e)}>Удалить</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}