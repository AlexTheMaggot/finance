import React, {Component} from "react";
import './App.css'
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import Aside from "./Aside";
import ExpensesCreate from "./ExpensesCreate";
import IncomesCreate from "./IncomesCreate";
import ExpensesList from "./ExpensesList";
import IncomesList from "./IncomesList";


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container-fluid app">
                    <div className="row header">
                        <div className="block__wrapper">
                            <Header />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-3">
                            <div className="row aside">
                                <div className="block__wrapper">
                                    <Aside />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9">
                            <div className="row content">
                                <div className="block__wrapper">
                                    <Routes>
                                        <Route exact path='/' element={<Content />}></Route>
                                        <Route exact path='/expenses/create/' element={<ExpensesCreate />}></Route>
                                        <Route exact path='/expenses/list/' element={<ExpensesList />}></Route>
                                        <Route exact path='/incomes/create/' element={<IncomesCreate />}></Route>
                                        <Route exact path='/incomes/list/' element={<IncomesList />}></Route>
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
