const btnSearch = document.querySelector('button');
const cityContainer = document.querySelector('.cities-container');
let selectedCountry = null;
let countryCode;
let typeOfPollution = "pm25";
let numberOfMostPollutedCieties = 10;
let mostPollutedCities = [];
let arrayAll = [2];


const turnOnCityContainer = (element) => {
    element.style.display = "block";
};

const gettingCountryCode = () => {
    $.getJSON("https://api.openaq.org/v1/countries", (data) => {
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].name == selectedCountry) {
                countryCode = data.results[i].code;
            }
        }
        console.log(countryCode); //debug
    });
}

const addingMostPollutedCitiesToArray = (arr) => {
    console.log("countryCode in addin..." + countryCode); //debug
    console.log("arr in addin..." + arr); //debug
    $.getJSON(`https://api.openaq.org/v1/latest?country=PL&parameter=${typeOfPollution}`, (data, arrayParameter) => {
        console.log(data); //debug
        let arrayAll = [];
        for (let i = 0; i < data.results.length; i++) {
            arrayParameter[i] = data.results[i].measurements[0].value * 1;
        }
        console.log("arrayAll: " + arrayParameter); //debug
        arrayAll.sort(function (a, b) {
            return b - a
        });
        console.log("arrayAll: " + arrayParameter);
        arrayAll = arrayAll.splice(0, numberOfMostPollutedCieties);
        console.log("arrayAll sfter splice: " + arrayParameter); //debug

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 77; j++) {
                if (arrayParameter[i] == data.results[j].value) {
                    mostPollutedCities[i] = data.results[j].name;
                    console.log("mostPollutedCities: " + mostPollutedCities); //debug
                }
            }
        }
        console.log("mostPollutedCities: " + mostPollutedCities); //debug

    });

}

btnSearch.addEventListener('click', () => {
    selectedCountry = document.getElementById('myInput').value;
    if (selectedCountry == "France" || selectedCountry == "Germany" || selectedCountry == "Poland" || selectedCountry == "Spain") {
        turnOnCityContainer(cityContainer);
        gettingCountryCode();
        addingMostPollutedCitiesToArray(arrayAll);
    } else {
        alert("Unavailable country. Select France, Germany, Poland or Spain")
    }

});