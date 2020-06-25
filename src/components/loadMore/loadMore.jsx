import React from 'react';
import './loadMore.scss';

const LoadMore = ({onLoadMoreClick}) => {
    return (
        <section className="movies-page__load load-more">
            <button className="load-more__btn" onClick={onLoadMoreClick}>Load More</button>
        </section>
    )
}

export default LoadMore;