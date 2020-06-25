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
                <h1 className="visually-hidden">Movies Database Application, best way to search your lovely films!</h1>
                <MoviesPage />
              </main>
            </div>
        );
    }
}