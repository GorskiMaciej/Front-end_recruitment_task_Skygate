const btnSearch = document.querySelector('button');
// const city
let selectedCountry = null;

btnSearch.addEventListener('click', () => {
    selectedCountry = document.getElementById('myInput').value;
    checkingCountry(selectedCountry);
});

const checkingCountry = (country) => {
    console.log(country);
    if (country == "France" || country == "Germany" || country == "Poland" || country == "Spain") {} else {
        alert("Unavailable country. Select France, Germany, Poland or Spain")
    }
}