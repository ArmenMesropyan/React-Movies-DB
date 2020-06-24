import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import './header.scss';

export default class MoviesPage extends Component {

    state = {}

    render() {
        return (
            <header className="main__header main-header">
                <Container tag="nav" className="main-header__nav">
                    <Row tag="ul" className="main-header__list">
                        <Col tag="li" className="main-header__item main-header__item_logo">
                            <a href="/">
                                <img src="/logo.png" alt="Movies DB"/>
                            </a>
                        </Col>
                        <Col tag="li" className="main-header__item main-header__item_links">
                            <ul className="main-header__links">
                                <li className="main-header__link active">
                                    <a href="/test">
                                        Test
                                    </a>
                                </li>
                                <li className="main-header__link">
                                    <a href="/test">
                                        TestWO
                                    </a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}