import React, {Component} from 'react';
import {Home} from '../../';
import {GetService} from '../../../service';

export default class MoviesPage extends Component {

    state = {
        movies: [],
        firstSection: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: '',
    }

    getService = new GetService();

    async setMovieData() {
        try {
            const data = await this.getService.getMovies(1);
            console.log('data: ', data);
        } catch (error) {
            // onError
            console.log(error);
        }
    }

    componentDidMount() {
        this.setMovieData();
    }

    render() {
        return (
            <>
                <div>Movies Page</div>
                <Home />
            </>
        );
    }
}