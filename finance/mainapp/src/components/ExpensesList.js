import React, {Component} from 'react';

export default class ExpensesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'ExpendsList',
            }),
        }).then(data => data.json()).then((mydata) => {
            if (mydata.result ===  'success') {
                this.setState({data: mydata.content})
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
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}