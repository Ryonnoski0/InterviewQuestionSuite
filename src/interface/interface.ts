export interface CarouselRef extends HTMLElement {
    prevSlide: () => void;
    nextSlide: () => void;
    goToSlide: (index: number) => void;
}
