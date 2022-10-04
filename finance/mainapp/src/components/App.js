import React, {Component} from "react";
import './App.css'
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes, Navigate, useHistory} from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import Aside from "./Aside";
import ExpendsCreate from "./ExpendsCreate";
import IncomesCreate from "./IncomesCreate";


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
                                        <Route exact path='/expends/create/' element={<ExpendsCreate />}></Route>
                                        <Route exact path='/incomes/create/' element={<IncomesCreate />}></Route>
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
