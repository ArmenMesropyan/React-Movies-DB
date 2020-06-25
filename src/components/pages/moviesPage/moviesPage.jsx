import React, {Component} from 'react';
import {Home, Search, LoadMore} from '../../';
import {GetService} from '../../../service';

export default class MoviesPage extends Component {

    state = {
        movies: [],
        firstSection: null,
        loading: true,
        currentPage: 0,
        totalPages: 0,
        searchTerm: '',
    }

    getService = new GetService();

    async setMovieData(currentPage = 1, action = 'search') {
        try {
            const {results, page, total_pages} = await this.getService.getMovies(currentPage);
            const randomNum = Math.floor(Math.random() * 20 / 1);
            const firstSection = action === 'search' ? results[randomNum] : this.state.firstSection;
            const movies = action === 'search' ? [...results] : [...this.state.movies, ...results];

            this.setState({
                movies,
                firstSection,
                currentPage: page,
                loading: false,
                totalPages: total_pages,
            })
        } catch (error) {
            // onError
            console.log(error);
        }
    }

    async setMoviesByQuery(search, currentPage = 1, action = 'search') {
        try {
            const {results, page, total_pages} = await this.getService.getMoviesByQuery(search, currentPage);
            const movies = action === 'load' ? [...this.state.movies, ...results] : [...results];
            this.setState({
                movies,
                currentPage: page,
                loading: false,
                totalPages: total_pages,
            });
        } catch (error) {
            // onError
            console.log(error);
        }
    }

    loadMovies = async(searchTerm) => {
        this.setState({searchTerm});
        if(searchTerm) this.setMoviesByQuery(searchTerm);
        else this.setMovieData();
    }

    componentDidMount() {
        this.setState({loading: true});
        this.setMovieData();
    }

    onInputChange = (e) => {
        const {value} = e.target;

        this.loadMovies(value);
    }

    onLoadMoreClick = () => {
        const {currentPage, searchTerm, totalPages} = this.state;
        console.log('totalPages: ', totalPages);
        console.log('currentPage: ', currentPage);

        if(currentPage > totalPages) return;

        this.setState({loading: true});
        if (searchTerm) this.setMoviesByQuery(searchTerm, currentPage + 1, 'load');
        else this.setMovieData(currentPage + 1, 'load');
    }

    render() {
        const {firstSection, loading, movies} = this.state;
        console.log('movies', movies);
        return (
            <div className="movies-page">
                {loading ? <div>Spinner</div> : <Home movie={firstSection}/>}
                <Search onInputChange={this.onInputChange}/>
                <LoadMore onLoadMoreClick={this.onLoadMoreClick}/>
            </div>
        );
    }
}