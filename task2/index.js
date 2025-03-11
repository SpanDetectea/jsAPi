document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach((slide) => {
            slide.style.display = 'none';
        });
        dots.forEach((dot) => {
            dot.classList.remove('active-dot');
        });

        slides[n].style.display = 'block';
        dots[n].classList.add('active-dot');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function currentSlideClick(index) {
        return function () {
            currentSlide = index;
            showSlide(currentSlide);
        }
    }

    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', currentSlideClick(index));
    });

    showSlide(currentSlide);
});
