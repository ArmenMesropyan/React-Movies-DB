import React, {Component} from 'react';
import {Home, Search} from '../../';
import {GetService} from '../../../service';

export default class MoviesPage extends Component {

    state = {
        movies: [],
        firstSection: null,
        loading: true,
        currentPage: 0,
        totalPages: 0,
    }

    getService = new GetService();

    async setMovieData(currentPage) {
        try {
            const {results, page, total_pages} = await this.getService.getMovies(currentPage);
            const randomNum = Math.floor(Math.random() * 20 / 1);
            this.setState({
                movies: [...results],
                firstSection: results[randomNum],
                currentPage: page,
                loading: false,
                totalPages: total_pages,
            })
        } catch (error) {
            // onError
            console.log(error);
        }
    }

    async setMoviesByQuery(search, currentPage) {
        try {
            const {results, page, total_pages} = await this.getService.getMoviesByQuery(search, currentPage);
            this.setState({
                movies: [...results],
                currentPage: page,
                loading: false,
                totalPages: total_pages,
            })
            // data = await this.getService.getMoviesByQuery(searchTerm, 1);
        } catch (error) {
            // onError
            console.log(error);
        }
    }

    loadMovies = async(searchTerm) => {
        if(searchTerm) this.setMoviesByQuery(searchTerm, 1);
        else this.setMovieData(1);
    }

    componentDidMount() {
        this.setState({loading: true});
        this.setMovieData(1);
    }

    onInputChange = (e) => {
        const {value} = e.target;

        this.loadMovies(value);
    }

    render() {
        const {firstSection, loading, movies} = this.state;
        console.log('movies', movies);
        return (
            <div className="movies-page">
                {loading ? <div>Spinner</div> : <Home movie={firstSection}/>}
                <Search onInputChange={this.onInputChange}/>
            </div>
        );
    }
}