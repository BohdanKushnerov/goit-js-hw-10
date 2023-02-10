import './css/styles.css';
import API from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById('search-box');
const ulRef = document.querySelector('.country-list');
const divRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const counrty = e.target.value.trim();
  if (counrty === '') {
    resetContainerMarkup();
    resetListMarkup();
    return;
  }
  //   {
  //     "status": 404,
  //     "message": "Not Found"
  // }
  API.fetchCountries(counrty)
    .then(result => {
      if (result.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (result.length > 2 && result.length < 10) {
        createListMarkup(result);
        resetContainerMarkup();
      } else {
        createContainerMarkup(result);
        resetListMarkup();
      }
    })
    .catch(error => {
      console.log(error);

      Notify.failure('Oops, there is no country with that name');
    });
}

function createItem({ name: {official}, flags: {svg} }) {
  return `
  <li class="countries-item">
    <img class="countries-icon"src=${svg} alt=${official}>
    <h2 class="countries-title">${official}</h2>
  </li>
  `;
}

function createContainerMarkup([{ name: {official}, flags: {svg}, capital, population, languages }]) {
  const markup = `
  <img class="country-icon" src=${svg} alt=${official}>
  <h2 class="country-title">${official}</h2>
  <p class="country-capital">Capital: ${capital}</p>
  <p class="country-population">Population: ${population}</p>
  <p class="country-languages">Languages: ${Object.values(languages)}</p>
  `;

  updateContainerMarkup(markup);
}

function createListMarkup(result) {
  const markup = result.reduce((acc, value) => createItem(value) + acc, '');

  updateListMarkup(markup);
}

function updateContainerMarkup(markup) {
  divRef.innerHTML = markup;
}

function updateListMarkup(markup) {
  ulRef.innerHTML = markup;
}

function resetContainerMarkup() {
  divRef.innerHTML = '';
}

function resetListMarkup() {
  ulRef.innerHTML = '';
}
