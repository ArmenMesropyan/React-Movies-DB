import React, {Component} from 'react';
import {Home, Search, LoadMore, MoviesList} from '../../';
import {GetService} from '../../../service';

export default class MoviesPage extends Component {

    state = {
        movies: [],
        firstSection: null,
        homeLoading: true,
        moviesLoading: false,
        loadMore: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: '',
        title: '',
    }

    getService = new GetService();

    async setMovieData(currentPage = 1, action = 'load') {
        try {
            const {results, page, total_pages} = await this.getService.getMovies(currentPage);
            const randomNum = Math.floor(Math.random() * 20 / 1);
            const firstSection = action === 'load' ? results[randomNum] : this.state.firstSection;
            const movies = action === 'load' ? [...results] : [...this.state.movies, ...results];
            const title = action === 'load' ? 'Popular Movies' : 'Search Results';

            this.setState({
                movies,
                firstSection,
                currentPage: page,
                homeLoading: false,
                moviesLoading: false,
                totalPages: total_pages,
                title,
            });
        } catch (error) {
            // onError
            console.log(error);
        }
    }

    async setMoviesByQuery(search, currentPage = 1, action = 'search') {
        try {
            const {results, page, total_pages} = await this.getService.getMoviesByQuery(search, currentPage);
            const movies = action === 'load' ? [...this.state.movies, ...results] : [...results];
            const title = action === 'search' ? 'Search Results' : 'Popular Movies';
            this.setState({
                movies,
                currentPage: page,
                moviesLoading: false,
                totalPages: total_pages,
                title
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
        this.setState({homeLoading: true, moviesLoading: true});
        this.setMovieData();
    }

    onInputChange = (e) => {
        const {value} = e.target;

        this.setState({moviesLoading: true});
        this.loadMovies(value);
    }

    onLoadMoreClick = (e) => {
        const {currentPage, searchTerm, totalPages} = this.state;

        if(currentPage > totalPages) return;

        this.setState({loadMore: true});
        if (searchTerm) this.setMoviesByQuery(searchTerm, currentPage + 1, 'load');
        else this.setMovieData(currentPage + 1, 'load');
    }

    render() {
        const {firstSection, homeLoading, movies, title, moviesLoading} = this.state;
        return (
            <div className="movies-page">
                {homeLoading ? <div>Spinner</div> : <Home movie={firstSection}/>}
                <Search onInputChange={this.onInputChange}/>
                {moviesLoading ? <div>Spinner</div> : <MoviesList movies={movies} title={title}/>}
                {/* <LoadMore onLoadMoreClick={this.onLoadMoreClick}/> */}
            </div>
        );
    }
}