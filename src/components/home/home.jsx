import React, {Component} from 'react';
import './home.scss';
import {GetService} from '../../service';

export default class Home extends Component {
    state = {
        backgroundImage: null,
        title: '',
        overview: '',
        id: null,
    }
    getService = new GetService();

    setMovie({backdrop_path, title, overview, id }) {
        const backgroundImage = this.getService.getBackgroundImage(backdrop_path);
        this.setState({ backgroundImage, title, overview, id });
    }

    componentDidMount() {
        const {movie} = this.props;
        this.setMovie(movie);
    }

    render() {
        const { backgroundImage, title, overview, id } = this.state;
        console.log('backgroundImage: ', backgroundImage);
        return (
            <section className="movies-page__first first-section">
                
            </section>
        )
    }
}