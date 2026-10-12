let track = document.getElementById('track');
let dotsBox = document.getElementById('dots');
let total = track.children.length - 2;
let position = 1;
let busy = false;

for (let i = 1; i <= total; i++) {
    dotsBox.innerHTML += '<a href="#" class="dot"></a>';
}

let dots = document.getElementsByClassName('dot');

for (let i = 0; i < total; i++) {
    dots[i].addEventListener('click', function (event) {
        event.preventDefault();
        goToSlide(i + 1);
    });
}

function showSlide() {
    track.style.transform = 'translateX(-' + (position * 100) + '%)';

    let current = position;
    if (position === 0) {
        current = total;
    }
    if (position === total + 1) {
        current = 1;
    }

    for (let i = 0; i < total; i++) {
        dots[i].classList.remove('active');
    }
    dots[current - 1].classList.add('active');
}

function goToSlide(newPosition) {
    if (busy === true) {
        return;
    }
    busy = true;
    position = newPosition;
    track.style.transition = 'transform 0.5s ease';
    showSlide();

    setTimeout(function () {
        if (position === 0) {
            position = total;
        }
        if (position === total + 1) {
            position = 1;
        }
        track.style.transition = 'none';
        showSlide();
        busy = false;
    }, 500);
}

document.getElementById('next').addEventListener('click', function (event) {
    event.preventDefault();
    goToSlide(position + 1);
});

document.getElementById('prev').addEventListener('click', function (event) {
    event.preventDefault();
    goToSlide(position - 1);
});

showSlide();