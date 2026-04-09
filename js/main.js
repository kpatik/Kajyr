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

// FAQ accordion
function toggleFaq(btn) {
    var odpowiedz = btn.nextElementSibling;
    var isOpen = btn.classList.contains('otwarty');
    document.querySelectorAll('.faq__pytanie.otwarty').forEach(function(b) {
        b.classList.remove('otwarty');
        b.nextElementSibling.classList.remove('widoczny');
    });
    if (!isOpen) {
        btn.classList.add('otwarty');
        odpowiedz.classList.add('widoczny');
    }
}

// Hamburger menu
var hamburger = document.getElementById('hamburger');
var navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('otwarty');
    navMenu.classList.toggle('otwarty');
});

// Zamknij menu po kliknięciu w link
navMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('otwarty');
        navMenu.classList.remove('otwarty');
    });
});

// Scroll spy — aktywny link w nawigacji
var sekcje = document.querySelectorAll('section[id]');
var navLinki = document.querySelectorAll('.nav__menu a');

window.addEventListener('scroll', function() {
    var scrollY = window.pageYOffset;
    sekcje.forEach(function(sekcja) {
        var top = sekcja.offsetTop - 100;
        var height = sekcja.offsetHeight;
        var id = sekcja.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinki.forEach(function(link) {
                link.classList.remove('aktywny');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('aktywny');
                }
            });
        }
    });
});