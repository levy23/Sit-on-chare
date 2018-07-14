//========================================
//main slider
//========================================
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var slider = document.querySelector('#mainSlider');
        var prev = slider.querySelector('.main-slider-prev');
        var next = slider.querySelector('.main-slider-next');
        var slides = slider.querySelectorAll('.main-slider-slide');
        var currentSlide = 0; //obecny slide - domyslnie pierwszy
        var timer = null; //dla intervala
        var timeDelay = 50000; //czas automatycznego przelaczania

        var timeoutNextSlide = function() {
            timer = setTimeout(function() {
                next.click();
            }, timeDelay);
        };

        var prevSlide = function() {
            //robie petle po slide, wylaczajac im klase active
            for (var i=0; i<slides.length; i++) {
                slides[i].classList.remove('main-slider-slide--active');
            }
            currentSlide--;

            //jezeli licznik jest mniejszy od indeksu pierwszego slide
            //wracamy na ostatni slide (by dzialalo w petli)
            if (currentSlide < 0) {
                currentSlide = slides.length-1;
            }

            //dodaje odpowiedniemu slideowi klase active
            slides[currentSlide].classList.add('main-slider-slide--active');

            //czyszcze timeout by po recznym kliknieciu zaczac
            //odmiezac czas od poczatku (jezeli tego nie zrobie, to czlowiek
            //kliknie na next, a np w tym samym czasie poleci setTimeout ktory
            //stwierdzi, ze wlasnie przyszla pora sie odpalic
            clearTimeout(timer);
            timeoutNextSlide();
        };

        var nextSlide = function() {
            //robie petle po slide, wylaczajac im klase active
            for (var i=0; i<slides.length; i++) {
                slides[i].classList.remove('main-slider-slide--active');
            }

            //zwiekszam licznik
            currentSlide++;

            //jezeli licznik jest wiekszy od indeksu ostatniego slide
            //wracamy do poczatku (by dzialalo w petli)
            if (currentSlide > slides.length-1) {
                currentSlide = 0;
            }
            //dodaje odpowiedniemu slideowi klase active
            slides[currentSlide].classList.add('main-slider-slide--active');

            //czyszcze timeout by po recznym kliknieciu zaczac
            //odmiezac czas od poczatku (jezeli tego nie zrobie, to czlowiek
            //kliknie na next, a np w tym samym czasie poleci setTimeout ktory
            //stwierdzi, ze wlasnie przyszla pora sie odpalic
            clearTimeout(timer);
            timeoutNextSlide();
        };

        //odpalam timer do automatycznego przelaczania slidow
        timeoutNextSlide();

        //...i oczywiscie podpinam eventy pod strzalki
        prev.addEventListener('click', prevSlide);
        next.addEventListener('click', nextSlide);

    });

})();
