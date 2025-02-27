import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import {BlobTest}from "./blobTest"
import React, {Component} from 'react';

export class App extends Component{
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<BlobTest/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
};
