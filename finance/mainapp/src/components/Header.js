import React, {Component} from "react";


export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="block__wrapper">
                <div className="block">
                    <h3>Dashboard</h3>
                    <a href='/logout/' className='btn btn-danger'>Выход</a>
                </div>
            </div>
        );
    }
}