export interface SliderDatas {
    sliderPosition: number,
    startPosition: number,
    initialLength: number,
    currentIndex: number,
    totalSlideSize: number
}

export interface Carousel {
    image: string;
    title: string;
    description: string;
    url: string;
}

export interface SliderState {
    slider: Array<Carousel>,
    initialLength: number
}