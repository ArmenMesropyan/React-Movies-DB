import React, {Component} from 'react';
import './home.scss';
import {GetService} from '../../service';
import {Container} from 'reactstrap';

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
        const { backgroundImage, title, overview } = this.state;
        console.log('backgroundImage: ', backgroundImage);
        return (
            <section className="movies-page__first first-section" style={{
                background: 
                `linear-gradient(rgba(0, 0, 0, 0) , rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url(${backgroundImage}) center top / cover, rgb(28, 28, 28)`
                
            }}>
                <Container>
                    <div className="first-section__text">
                        <h2 className="first-section__title">{title}</h2>
                        <p className="first-section__overview">{overview}</p>
                    </div>
                </Container>
            </section>
        )
    }
}