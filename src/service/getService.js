export default class GetService {
    config = {
        movieAPI: 'https://api.themoviedb.org/3/',
        movieKey: 'b3b72e264bfde0ee393669648c9ca8a5',
        imageURL: 'http://image.tmdb.org/t/p',
        backgroundSize: 'w1280',
        posterSize: 'w500',
    }

    async fetchData(endpoint) {
        try {
            const data = await fetch(endpoint).then(data => data.json());
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    getMovies = async(page) => {
        try {
            const { movieAPI, movieKey } = this.config;
            const endpoint = `${movieAPI}movie/popular?api_key=${movieKey}&language=en-US&page=${page}`;
            const data = await this.fetchData(endpoint)
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}