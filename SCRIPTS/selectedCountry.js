const btnSearch = document.querySelector('button');
const cityContainer = document.querySelector('.cities-container');
let selectedCountry = null;

btnSearch.addEventListener('click', () => {
    selectedCountry = document.getElementById('myInput').value;
    checkingCountry(selectedCountry);
    turnOnCityContainer(cityContainer);
});

const checkingCountry = (country) => {
    console.log(country);
    if (country == "France" || country == "Germany" || country == "Poland" || country == "Spain") {} else {
        alert("Unavailable country. Select France, Germany, Poland or Spain")
    }
}

const turnOnCityContainer = (element) => {
    element.style.display = "block";
};