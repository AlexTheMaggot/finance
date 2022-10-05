import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class Aside extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="block">
                <h3>Aside</h3>
                <nav>
                    <ul className='nav'>
                        <li><Link to={'/'} className='nav__item btn btn-primary'>Главная</Link></li>
                        <li><Link to={'/expenses/create/'} className='nav__item btn btn-primary'>Новый расход</Link></li>
                        <li><Link to={'/incomes/create/'} className='nav__item btn btn-primary'>Новый доход</Link></li>
                        <li><Link to={'/expenses/list/'} className='nav__item btn btn-primary'>Список расходов</Link></li>
                        <li><Link to={'/incomes/list/'} className='nav__item btn btn-primary'>Список доходов</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}