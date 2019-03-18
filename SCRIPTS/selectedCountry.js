const btnSearch = document.querySelector('button');
const cityContainer = document.querySelector('.cities-container');
let selectedCountry = null;
let countryCode = "";
let typeOfPollution = "pm25";
let numberOfMostPollutedCieties = 10;
let mostPollutedCities = [];
let arrayAll = [2];
let url = `https://api.openaq.org/v1/latest?country=${countryCode}&parameter=${typeOfPollution}`;
let urlCountries = `https://api.openaq.org/v1/countries`;




const turnOnCityContainer = (element) => {
    element.style.display = "block";
};

//getting country code from json depending on the selected country
const gettingCountryCode = () => {
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
    return countryCode + "";
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

// const addingMostPollutedCitiesToArray = (x, countryCodeParameter) => {
//     $.getJSON(`https://api.openaq.org/v1/latest?country=${countryCodeParameter}&parameter=${typeOfPollution}`, (data) => {
//         console.log(data); //debug
//         let arrayAll = [];
//         for (let i = 0; i < data.results.length; i++) {
//             arrayAll[i] = data.results[i].measurements[0].value * 1;
//         }
//         arrayAll.sort(function (a, b) {
//             return b - a
//         });
//         arrayAll = arrayAll.splice(0, numberOfMostPollutedCieties);

//         for (let i = 0; i < numberOfMostPollutedCieties; i++) {
//             for (let j = 0; j < 77; j++) {
//                 if (arrayAll[i] == data.results[j].value) {
//                     mostPollutedCities[i] = data.results[j].name;
//                     console.log("mostPollutedCities: " + mostPollutedCities); //debug
//                 }
//             }
//         }
//         console.log("mostPollutedCities: " + mostPollutedCities); //debug
//     });

// }

btnSearch.addEventListener('click', () => {
    selectedCountry = document.getElementById('myInput').value;
    if (selectedCountry == "France" || selectedCountry == "Germany" || selectedCountry == "Poland" || selectedCountry == "Spain") {
        turnOnCityContainer(cityContainer);
        countryCode = gettingCountryCode();
        console.log("country code: " + countryCode); // country code is not updated
        addingMostPollutedCitiesToArray(url); //url is not updated after click
    } else {
        alert("Unavailable country. Select France, Germany, Poland or Spain")
    }

});