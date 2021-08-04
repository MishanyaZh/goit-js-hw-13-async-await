console.log('hello-api');
import Notiflix from "notiflix"

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '22670626-c734a5ab3fb2edefe4011dc83';

// class Sasha Repeta

export default class fetchImagesApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };

    async fetchImages() {
        const urlApi = `${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        const response = await fetch(urlApi);
        const images = await response.json();
        const { total, hits } = await images;
        if (total > 0 && this.page === 1) {
            Notiflix.Notify.success(`Hooray! We found ${total} images.`);
            // console.log(`${total}`);
        }
        this.incPage();
        return hits;
    }

    incPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}
