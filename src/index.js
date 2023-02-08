// https://restcountries.com/v3.1/name/ukraine
// https://restcountries.com/v2/name/ukraine?fields=name,capital,population,languages

// https://restcountries.com/v2/all?fields=name,capital,currencies

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

import './css/styles.css';
import API from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById('search-box');
const ulRef = document.querySelector('.country-list');
const divRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearch, 300));
// console.log(inputRef.value)
function onSearch(e) {
  // const counrty = e.currentTarget.value; //не робить
  const counrty = e.target.value.trim();
  // console.log(inputRef.value)
  if(counrty === '') {
    resetDivMarkup()
  }
  // console.log(e.target.value);
  API.fetchCountries(counrty)
  .then(result => {
    if(result.length > 10) {
      Notify.info("Too many matches found. Please enter a more specific name.");
      return
    } else if(result.length > 2 && result.length < 10) {    
      const markup = result.reduce(
        (acc, value) => createUl(value) + acc,
          ""
          );

      ulRef.innerHTML = markup;
      resetDivMarkup()
    } else {
      createMarkupDiv(result);
      resetUlMarkup()
    }
  })
  // .catch(
  //   Notify.warning("Oops, there is no country with that name");
  // )
  // .finally()
  }

function createUl({name, flags}) {
  return `
  <li>
    <img src=${flags.svg} alt=${name} width = '50'>
    <h2>${name.official}</h2>
  </li>
  `
}

function createMarkupDiv ([{name, flags, capital, population, languages}]) {
  const markup = `
  <img src=${flags.svg} alt=${name} width = '50'>
  <h2>${name.official}</h2>
  <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${Object.values(languages)}</p>
  `

  divRef.innerHTML = markup;
}

function createMarkupUl () {
  
}

function resetDivMarkup() {
  divRef.innerHTML = '';
}

function resetUlMarkup() {
  ulRef.innerHTML = '';
}

// function updateMarkup(markup) {
//   divRef.innerHTML = markup;
// }

// function updateUl(markup) {
//   ulRef.innerHTML = markup;
// }