import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce'

const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById('search-box');
const ulRef = document.querySelector('.country-list');
const divRef = document.querySelector('.country-info');

// // console.log(divRef)

// console.log(API.fetchCountries('france')
// .then(createMarkup))

API.fetchCountries('usa')
.then(createMarkup)
.then(updateMarkup)

function createMarkup ([{name, flags, capital, population, languages}]) {
  // console.log(languages)
  return `
  <img src=${flags.svg} alt=${name} width = '50'>
  <h2>${name.official}</h2>
  <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${Object.values(languages)}</p>
  `
}

function updateMarkup(markup) {
  divRef.innerHTML = markup;
}


// MARKUP
// флаг h2 -- img Sweden

// p -- Capital:Stockholm
// p -- Population: 9894888
// p -- Languages: Swedish





// inputEl.addEventListener('input', ...)

// debounce(func, DEBOUNCE_DELAY)

// Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, а розмітка списку країн або інформації про країну зникає.

// Виконай санітизацію введеного рядка методом trim(), це вирішить проблему, коли в полі введення тільки пробіли, або вони є на початку і в кінці рядка.


// API.fetchCountries('ukraine')










// https://restcountries.com/v3.1/name/ukraine

// https://restcountries.com/v2/name/ukraine?fields=name,capital,population,languages

// https://restcountries.com/v2/all?fields=name,capital,currencies

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов





// https://restcountries.com/v3.1/name/{name}
// https://restcountries.com/v2/name/{name}

//-------------------------------------------------
// const options = {
//   headers: {
//     "X-Api-Key": "dd82ff3604224bf1b224da3ef75c9135",
//   },
// };

// function fetchData(query) {
//   const URL = `https://newsapi.org/v2/everything?q=cat`;

//   return fetch(URL, options).then((response) => response.json());
// }

// fetchData('cat')
//     .then(({ articles }) => {
//       if (articles.length === 0) throw new Error("No data");
//       console.log(articles)
//       return articles.reduce(
//         (markup, article) => createMarkup(article) + markup,
//         ""
//       );
//     })
//     .then(createMarkup)
//     // .then(console.log(e))

//     function createMarkup({ author, title, description, url, urlToImage }) {
//       console.log(author)
//       return `
//       <div class="article-card">
//         <img src=${urlToImage} class="article-img" />
//         <h2 class="article-title">${title}</h2>
//         <h3 class="article-author">${author || "anonymous"}</h3>
//         <p  class="article-description">${description}</p>
//         <a href=${url} class="article-link" target="_blank">Read more</a>
//       </div>
//       `;
//     }