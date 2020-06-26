import React, {Component} from 'react';
import './movies.scss';
import {GetService} from '../../service';
import {Container, Row, Col} from 'reactstrap';

export default class MoviesList extends Component {
    state = {
        length: 0,
        movies: null,
        title: '',
    }
    getService = new GetService();
    componentDidMount() {
        const {movies, title} = this.props;
        this.setState({movies, length: movies.length, title});
    }
    componentDidUpdate(lastProps) {
        if(lastProps === this.props) return;
        const {movies, title} = this.props;
        this.setState({movies, length: movies.length, title});
    }
    getMoviesElements = ({ id, poster_path, title }) => {
        const img = this.getService.getPosterImage(poster_path);
        return (
            <Col tag="li" className="movies-list__item" md="3" key={id}>
                <div className="movies-list__movie">
                    <img src={img} alt={title}/>
                </div>
            </Col>
        );
    }
    render() {
        const {movies, title} = this.state;
        if (!movies) return null;
        const elements = movies.map(this.getMoviesElements);
        return (
            <section className="movies-page__list movies-list">
                <Container>
                    <h2 className="movies-page__title">{title}</h2>
                    <Row tag="ul" className="movies-list__list">
                        {elements}
                    </Row>
                </Container>
            </section>
        )
    }
}