export default async function decorate(block) {

    const cards = Array.from(block.children);
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "dots-container";

    
    const cardsContainer = document.createElement("div");
    cardsContainer.className = 'cards-container';

    while (block.firstChild) {
        cardsContainer.appendChild(block.firstChild);
    }

    block.appendChild(cardsContainer);
    block.appendChild(dotsContainer);

    let visibleCards = calculateVisibleCards();
    let totalSlides;
    let currentIndex = 0;

    function calculateVisibleCards() {
        const width = window.innerWidth;
        if (width >= 1280) return 5;
        if (width >= 961) return 4;
        if (width >= 641) return 3;
        return 2;
    }

    function getTotalSlides() {
        return Math.ceil(cards.length / visibleCards);
    }

    function renderDots() {
        dotsContainer.innerHTML = "";
        totalSlides = getTotalSlides();
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("button");
            dot.addEventListener("click", () => slideTo(i));
            if (i === currentIndex) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        }
    }

    function slideTo(index) {
        if (index < 0 || index >= totalSlides) return;
        currentIndex = index;

        const offset = -(index * visibleCards * (100 / visibleCards));
        cardsContainer.style.transform = `translateX(${offset}%)`;


        renderDots();
    }

    function initializeCarousel() {
        renderDots();
        slideTo(0);
    }

   
    window.addEventListener("resize", () => {
        visibleCards = calculateVisibleCards();
        initializeCarousel();
    });

    initializeCarousel();
}
