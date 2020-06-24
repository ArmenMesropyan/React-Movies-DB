import React, {Component} from 'react';
import {MoviesPage} from '../pages';
import {Header} from '../';

export default class App extends Component {

    state = {}

    render() {
        return (
            <div className="app">
              <Header/>
              <main className="app__main app-main">
                <MoviesPage />
              </main>
            </div>
        );
    }
}