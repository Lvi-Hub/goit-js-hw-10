import './css/styles.css';
//--
var debounce = require('lodash.debounce');
//--
const DEBOUNCE_DELAY = 300;
const ref = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('country-info'),
};

ref.inputEl.addEventListener('input', debounce(inputListen, DEBOUNCE_DELAY));

function inputListen(e) {
  console.log(e.target.value.trim());
}
