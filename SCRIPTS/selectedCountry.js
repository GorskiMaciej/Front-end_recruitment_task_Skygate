const btnSearch = document.querySelector('button');
const cityContainer = document.querySelector('.cities-container');
let selectedCountry = null;
let countryCode = "";
let typeOfPollution = "pm25";
let numberOfMostPollutedCieties = 10;
let mostPollutedCities = [];
let arrayMeasurementValues = [];
let arrayCitiesNames = [];
let pairCityValue = [];
let selectedCitiesDescriptions = [];
let mostPollutedCitiesWithoutRepeats = [];
let found = false;
let count = 0;
let urlCitiesDescriptions = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=`
let url = `https://api.openaq.org/v1/latest?country=${countryCode}&parameter=${typeOfPollution}`;
let urlCountries = `https://api.openaq.org/v1/countries`;




const turnOnCityContainer = (element) => {
    element.style.display = "block";
};

async function getMostPollutedCities() {
    //clearing variables


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
                // console.log(countryCode); // debug to show code of selected country
            })
            .catch(err => {
                throw err
            });

        url = `https://api.openaq.org/v1/latest?country=${countryCode}&parameter=${typeOfPollution}`
        // await console.log(url); // debug to check if url is correct

        //fetching cities with values of pollution and creating arrays
        await fetch(url)
            .then(res => res.json())
            .then((out) => {
                // console.log(out); //showing fetched datas
                for (let i = 0; i < out.results.length; i++) {
                    arrayMeasurementValues[i] = out.results[i].measurements[0].value;
                    arrayCitiesNames[i] = out.results[i].city;

                }
                // console.log("ArrayValues after init: " + arrayMeasurementValues); // showing all pollution values
                // console.log("ArrayCities after init: " + arrayCitiesNames); // showing cities names

                //sorting values fro biggest to smallest
                arrayMeasurementValues.sort(function (a, b) {
                    return b - a
                });

                // console.log("ArrayValues after sorting: " + arrayMeasurementValues);// showing array after sorting

                //making objects from cities names and measurments values and adding then to array
                for (let i = 0; i < arrayMeasurementValues.length; i++) {
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

            })
        // console.log("mostPollutedCities: " + mostPollutedCities); //debug to show all cities with pollution values
        // pairCityValue.forEach(element => {
        //     console.log(`${element.city}: ${element.value}`);
        // });

        //adding objects with cities names and pollution values to unique array without cities repeat
        for (let i = 0; i < pairCityValue.length; i++) {
            for (let j = 0; j < mostPollutedCitiesWithoutRepeats.length; j++) {
                if (pairCityValue[i].city === mostPollutedCitiesWithoutRepeats[j].city) {
                    found = true;
                }
            }
            count++;
            if (count == 1 && found == false) {
                mostPollutedCitiesWithoutRepeats.push(pairCityValue[i]);
            }
            count = 0;
            found = false;
        }
        // mostPollutedCitiesWithoutRepeats.forEach(element => { //showing objects with cities names and mesurements values
        //     console.log(`${element.city}: ${element.value}`);
        // });
        mostPollutedCitiesWithoutRepeats = mostPollutedCitiesWithoutRepeats.splice(0, 10);

        // mostPollutedCitiesWithoutRepeats.forEach(element => { //showing objects with cities names and mesurements values
        //     console.log(`${element.city}: ${element.value}`);
        // });

        // Adding cities names to list showing most polluted cities in selected country
        for (let i = 0; i < numberOfMostPollutedCieties; i++) {
            // console.log(document.querySelector(`div.city:nth-child(${i+1})`)); //debug showing selected divs
            document.querySelector(`div.city:nth-child(${i+1}) div h2`).textContent = `${i+1}. ${mostPollutedCitiesWithoutRepeats[i].city}`;
        }
        //fetching citise descriptions
        for (let i = 0; i < mostPollutedCitiesWithoutRepeats.length; i++) {
            axios.get(urlCitiesDescriptions + mostPollutedCitiesWithoutRepeats[i].city)
                .then(response => {
                    let id;
                    for (let key in response.data.query.pages) {
                        id = key;
                    }
                    console.log(id)
                    selectedCitiesDescriptions[i] = response.data.query.pages[id].extract;
                    console.log(selectedCitiesDescriptions[i]);
                    document.querySelector(`div.city:nth-child(${i+1}) div p`).textContent = `${selectedCitiesDescriptions[i]}`;
                });

        }



    } else {
        alert("Unavailable country. Select France, Germany, Poland or Spain")
    }

}

btnSearch.addEventListener('click', getMostPollutedCities);