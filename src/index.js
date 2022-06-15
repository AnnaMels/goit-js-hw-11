import Notiflix from 'notiflix';
import getImages from './js/fetchImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const axios = require('axios');

const refs = {
    searchButton: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.display = 'none';

refs.searchButton.addEventListener('submit', onSubmitBtnClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

let pageCount = 0;
let imagesPerPage = 0;

const lightbox = new SimpleLightbox(' .photo-card a');


function onSubmitBtnClick(e) {
    e.preventDefault();
    pageCount = 1;
    searchImages();
    clearGallery();
};

function searchImages() {
    const inputValue = refs.input.value;
    getImages(inputValue, pageCount).then(it => {
        countImagesPerPage(it);
        renderCards(it);
    });
};


function onLoadMoreBtnClick() {
    pageCount += 1;
    searchImages();
    lightbox.refresh();
};


function renderCards({ hits }) {
    const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>${likes}
    </p>
    <p class="info-item">
      <b>Views:</b>${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>${downloads}
    </p>
  </div>
</div>`
    }).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    new SimpleLightbox(' .photo-card a');
};


function clearGallery() {
    refs.gallery.innerHTML = '';
};

function countImagesPerPage({ hits, totalHits }) {
    imagesPerPage += hits.length;
      if (hits.length === 0) {
        refs.loadMoreBtn.style.display = 'none';   
    }
    
    if (hits.length !== 0) {
        refs.loadMoreBtn.style.display = 'block'; 
    }

    if (hits.length === 0) {
         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    if (imagesPerPage === totalHits && hits.length !== 0) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }

    if (imagesPerPage > 0 && pageCount === 1 && hits.length !== 0) {
         Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    }
};

