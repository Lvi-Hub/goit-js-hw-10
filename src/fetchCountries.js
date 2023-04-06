export class JSONPlaceholderAPI {
  searchName = '';
  fetchCountries() {
    return fetch(`https://restcountries.com/v3.1/name/${this.searchName}`).then(
      res => {
        if (!res.ok) {
          throw new Error(res.status);
        }

        return res.json();
      }
    );
  }
}
