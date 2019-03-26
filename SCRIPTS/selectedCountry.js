const btnSearch = document.querySelector('button');
const cityContainer = document.querySelector('.cities-container');
let selectedCountry = null;
let countryCode = "";
let typeOfPollution = "pm25";
let numberOfMostPollutedCieties = 79;
let mostPollutedCities = [];
let arrayMeasurementValues = [];
let arrayCitiesNames = [];
let url = `https://api.openaq.org/v1/latest?country=${countryCode}&parameter=${typeOfPollution}`;
let urlCountries = `https://api.openaq.org/v1/countries`;




const turnOnCityContainer = (element) => {
    element.style.display = "block";
};

//getting country code from json depending on the selected country
const gettingCountryCode = (callback) => {
    fetch(urlCountries)
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            for (let i = 0; i < out.results.length; i++) {
                if (out.results[i].name == selectedCountry) {
                    countryCode = out.results[i].code;
                }
            }
            console.log(countryCode);
        })
        .catch(err => {
            throw err
        });
    callback();
};


const addingMostPollutedCitiesToArray = (urlParameter) => {
    fetch(urlParameter)
        .then(res => res.json())
        .then((out) => {

            console.log('Checkout this JSON! ', out);

        })
        .catch(err => {
            throw err
        });
};

async function getMostPollutedCities() {
    selectedCountry = document.getElementById('myInput').value;
    if (selectedCountry == "France" || selectedCountry == "Germany" || selectedCountry == "Poland" || selectedCountry == "Spain") {
        turnOnCityContainer(cityContainer);

        //fetching countries and getting countryCode
        await fetch(urlCountries)
            .then(res => res.json())
            .then((code) => {
                for (let i = 0; i < code.results.length; i++) {
                    if (code.results[i].name == selectedCountry) {
                        countryCode = code.results[i].code;
                    }
                }
                console.log(countryCode); // debug to show code of selected country
            })
            .catch(err => {
                throw err
            });

        url = `https://api.openaq.org/v1/latest?country=${countryCode}&parameter=${typeOfPollution}`
        await console.log(url); // debug to check if url is correct

        await fetch(url)
            .then(res => res.json())
            .then((out) => {
                console.log(out); //debug
                for (let i = 0; i < out.results.length; i++) {
                    arrayMeasurementValues[i] = out.results[i].measurements[0].value;
                    arrayCitiesNames[i] = out.results[i].city;

                }
                console.log("ArrayValues after init: " + arrayMeasurementValues);
                console.log("ArrayCities after init: " + arrayCitiesNames);

                arrayMeasurementValues.sort(function (a, b) {
                    return b - a
                });

                console.log("ArrayValues after sorting: " + arrayMeasurementValues);

                // arrayMeasurementValues = arrayMeasurementValues.splice(0, numberOfMostPollutedCieties);

                // console.log("ArrayValues after splice: " + arrayMeasurementValues);
                let pairCityValue = [];
                for (let i = 0; i < numberOfMostPollutedCieties; i++) {
                    for (let j = 0; j < out.results.length; j++) {
                        if (arrayMeasurementValues[i] === out.results[j].measurements[0].value) {


                            // console.log(arrayMeasurementValues[i]);
                            // console.log(out.results[j].measurements[0].value + " - " + out.results[j].city);
                            let pair = new Object();
                            pair.city = out.results[j].city;
                            pair.value = out.results[j].measurements[0].value;
                            pairCityValue[i] = pair;
                            mostPollutedCities[i] = out.results[j].city;
                        }
                    }
                }
                console.log("mostPollutedCities: " + mostPollutedCities); //debug
                console.log("mostPollutedCities-pairs: " + pairCityValue[0]); //debug
            })


    } else {
        alert("Unavailable country. Select France, Germany, Poland or Spain")
    }

}

btnSearch.addEventListener('click', getMostPollutedCities);