document.addEventListener('DOMContentLoaded', () => {
    const carouselLists = document.querySelectorAll('.carousel-list');

    carouselLists.forEach(list => {
        const items = list.querySelectorAll('li');
        if (items.length === 0) return;

        const itemHeight = items[0].offsetHeight; 
        const itemSpacing = (items.length > 1) ? parseFloat(getComputedStyle(items[1]).marginTop) : 0; 
        const itemHeightWithSpacing = itemHeight + itemSpacing; 

        const originalItemsCount = items.length / 2; 
        const resetScrollPoint = originalItemsCount * itemHeightWithSpacing;

        const animationDurationPerItem = 1500; 
        const pauseBetweenItems = 500;
        const totalStepTime = animationDurationPerItem + pauseBetweenItems;
        let currentScroll = 0; 
        let animationInterval;

        function animateCarousel() {
            if (currentScroll >= resetScrollPoint) {
                list.style.transition = 'none'; 
                list.style.transform = 'translateY(100px)'; 
                currentScroll = 1;
                void list.offsetHeight;
            }

            list.style.transition = `transform ${animationDurationPerItem / 1000}s ease-in-out`;
            list.style.transform = `translateY(-${currentScroll}px)`;

            currentScroll += itemHeightWithSpacing;
        }

        setTimeout(() => {
            animateCarousel(); // Ejecuta la primera animación
            animationInterval = setInterval(animateCarousel, totalStepTime); // Establece el intervalo para las siguientes
        }, pauseBetweenItems);


    });
});