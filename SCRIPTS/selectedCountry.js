const btnSearch = document.querySelector('button');
let selectedCountry = null;

btnSearch.addEventListener('click', () => {
    selectedCountry = document.getElementById('myInput').value;
    console.log(selectedCountry);
});