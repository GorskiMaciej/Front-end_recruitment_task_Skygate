const arrows = document.querySelectorAll('i');

let citiesDescriptions = document.querySelectorAll('.city-description p')

for (let i = 0; i < arrows.length; i++) {

    arrows[i].addEventListener('click', () => {
        citiesDescriptions[i].classList.toggle('active');
        arrows[i].classList.toggle('active');
    });
};