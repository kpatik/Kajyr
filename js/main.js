// Slider realizacji
var aktywnySlajd = 0;
var wszystkieSlajdy = document.querySelectorAll('.slider__slide');
var liczbaSlajdow = wszystkieSlajdy.length;
var autoplay;

function inicjujDotki() {
    var dotkiDiv = document.getElementById('sliderDots');
    dotkiDiv.innerHTML = '';
    for (var i = 0; i < liczbaSlajdow; i++) {
        var dot = document.createElement('button');
        dot.className = 'slider__dot' + (i === 0 ? ' aktywny' : '');
        dot.setAttribute('data-index', i);
        dot.onclick = function() {
            idzDoSlajdu(parseInt(this.getAttribute('data-index')));
        };
        dotkiDiv.appendChild(dot);
    }
}

function idzDoSlajdu(n) {
    aktywnySlajd = n;
    document.getElementById('sliderTrack').style.transform = 'translateX(-' + (aktywnySlajd * 100) + '%)';
    var dotki = document.querySelectorAll('.slider__dot');
    dotki.forEach(function(d, i) {
        d.classList.toggle('aktywny', i === aktywnySlajd);
    });
}

function zmienSlajd(kierunek) {
    var nowy = (aktywnySlajd + kierunek + liczbaSlajdow) % liczbaSlajdow;
    idzDoSlajdu(nowy);
    resetAutoplay();
}

function resetAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(function() {
        zmienSlajd(1);
    }, 5000);
}

inicjujDotki();
resetAutoplay();