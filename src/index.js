import './css/styles.css';
import Notiflix from 'notiflix';
import { JSONPlaceholderAPI } from './fetchCountries.js';
//--
import markupSearchNameHBS from './templates/country-name.hbs';
import markupSearchListHBS from './templates/country-list.hbs';
// document.body.innerHTML = templateFunction();
//--

//--
var debounce = require('lodash.debounce');
//--
const DEBOUNCE_DELAY = 300;
const ref = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

ref.inputEl.addEventListener('input', debounce(inputListen, DEBOUNCE_DELAY));
//--
const jsonPlaceholderApi = new JSONPlaceholderAPI();
//--

function inputListen(e) {
  let searchName = e.target.value.trim();
  console.log(searchName);
  jsonPlaceholderApi.searchName = searchName;
  jsonPlaceholderApi
    .fetchCountries()
    .then(data => {
      cleanFild();
      //console.log(data.searchName.value);
      if (ref.inputEl.value === '') {
        return;
      }

      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (data.length > 1 && data.length < 10) {
        ref.countryList.innerHTML = markupSearchListHBS({ ...data });
      }

      if (data.length === 1) {
        ref.countryInfo.innerHTML = markupSearchNameHBS({ ...data });
      }
    })
    .catch(err => {
      cleanFild();
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(err);
    });
}
function cleanFild() {
  ref.countryList.innerHTML = '';
  ref.countryInfo.innerHTML = '';
}
