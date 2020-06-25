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

    async setMovieData(currentPage) {
        try {
            const {results, page, total_pages} = await this.getService.getMovies(currentPage);
            this.setState({
                movies: [...this.state.movies, ...results],
                firstSection: results[0],
                currentPage: page,
                loading: false,
                totalPages: total_pages,
            })
        } catch (error) {
            // onError
            console.log(error);
        }
    }

    loadMoreMovies = async() => {
        try {
            let data;
            const {searchTerm, currentPage} = this.state;

            if(searchTerm) data = await this.getService.getMoviesByQuery(searchTerm, currentPage + 1);
            else data = await this.setMovieData(currentPage + 1);
            console.log('data: ', data);

        } catch (error) {
            // onError
            console.log(error);
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        this.setMovieData(1);
    }

    render() {
        console.log(this.state);
        return (
            <>
                <div>Movies Page</div>
                <Home />
            </>
        );
    }
}