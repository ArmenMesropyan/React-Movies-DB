import React, {Component} from 'react';
import './movies.scss';
import {GetService} from '../../service';

export default class MoviesList extends Component {
    state = {
        length: 0,
        movies: null,
    }
    getService = new GetService();
    componentDidMount() {
        const {movies} = this.props;
        this.setState({movies, length: movies.length});
    }
    componentDidUpdate(lastProps) {
        if(lastProps === this.props) return;
        const {movies} = this.props;
        this.setState({movies, length: movies.length});
    }
    getMoviesElements = ({ id, poster_path, title }) => {
        const img = this.getService.getPosterImage(poster_path);
        return (
            <div key={id}>
                <img src={img} alt={title}/>
                <h3>{title}</h3>
            </div>
        );
    }
    render() {
        const {movies} = this.state;
        if (!movies) return null;
        const elements = movies.map(this.getMoviesElements);
        console.log('elements: ', elements);
        return (
            <div>
                {elements}
            </div>
        )
    }
}