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
                        <li><Link to={'/expends/create/'} className='nav__item btn btn-primary'>Новый расход</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}