import './sass/main.scss';

import './js/API';

import fetchImagesApi from './js/API'
// console.log(fetchImagesApi);
import photoCardTpl from './templates/photo-card.hbs'
// console.log(photoCardTpl);

import Notiflix from "notiflix"
import { async } from 'fast-glob';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const newfetchImagesApi = new fetchImagesApi();

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', fetchImages);

function onSearchForm (evt) {
    evt.preventDefault();

    newfetchImagesApi.query = evt.currentTarget.elements.searchQuery.value;
    // console.log(newfetchImagesApi.query);

   if (newfetchImagesApi.query === '') {
       return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   }
    
    hiddenLoadMoreBtn();
    
    newfetchImagesApi.resetPage();
    clearGalleryContainer();
    evt.currentTarget.elements.searchQuery.value = '';
   
    fetchImages();
    
}

// na osnovi vvedenyh dannyh shukay dani
async function fetchImages() {
    try {
        showLoadMoreBtn();
        
    const response = await newfetchImagesApi.fetchImages();

        if (response.length === 0) {
        hiddenLoadMoreBtn();
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    
        if (response.length < 40) {
        hiddenLoadMoreBtn();
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    }
// z otrymanyh dannyh robly rozmitku
        return photoCardMarkup(response);
        
    } catch (error) {
        console.log(error);
    }

}
// rozmetka
function photoCardMarkup(images) {
    galleryContainer.insertAdjacentHTML('beforeend', photoCardTpl(images))
}

// o4istil stranicu
function clearGalleryContainer() {
    galleryContainer.innerHTML = '';
}

// pokazal knopku
function showLoadMoreBtn() {
    loadMoreBtn.classList.remove('is-hidden')
}

// ubral knopku
function hiddenLoadMoreBtn() {
    loadMoreBtn.classList.add('is-hidden')
}
