import { Component, h, Element, State, Fragment, Host, Prop } from '@stencil/core';
import { Carousel, SliderDatas, SliderState } from './q-carousel-interfaces';

@Component({
  tag: 'q-carousel',
  styleUrl: 'q-carousel.scss',
  shadow: true,
})
export class QCarousel {
  @Element() element: HTMLElement;

  @State() sliderDatas: SliderDatas = {
    sliderPosition: 0,
    startPosition: 0,
    initialLength: 0,
    currentIndex: 2,
    totalSlideSize: 0
  };
  @State() noAnimate: boolean = false;
  @State() slider: SliderState = {slider: [], initialLength: 0};
  @State() textYPosition: string = '400';

  @Prop() withScroll: boolean = true;
  
  private interval: ReturnType<typeof setTimeout>;
  private slideMargin:number = 40;

  connectedCallback() {
    const initSlider: Array<Carousel> = [];
    let initialLength: number = 0;

    this.element.querySelectorAll('li').forEach((li:HTMLLIElement) => {
      if (
        !li.hasAttribute('carousel-image-url')
        || !li.hasAttribute('carousel-description')
        || !li.hasAttribute('carousel-title')
        || !li.hasAttribute('carousel-url')
      ) return;
      
      initialLength++;
      initSlider.push({
        image: li.getAttribute('carousel-image-url'),
        description: li.getAttribute('carousel-description'),
        title: li.getAttribute('carousel-title'),
        url: li.getAttribute('carousel-url')
      });
    });

    const first = initSlider[0];
    const second = initSlider[1];
    const slider = [...initSlider];
    slider.unshift(initSlider[initSlider.length - 2], initSlider[initSlider.length - 1]);
    slider.push(first, second);
    
    this.slider = {slider, initialLength};
  }

  componentDidRender() {
    
  }
  componentDidLoad() {
    const fontCssUrl: Array<String> = [
      'https://fonts.googleapis.com/css2?family=Material+Icons',
      'https://fonts.googleapis.com/css2?family=Abel&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
    ];

    fontCssUrl.forEach((url: string) => {
      let style = document.querySelector(`link[href="${url}"]`);
      if (style) return;
      
      style = document.createElement('link');
      style.setAttribute('rel', 'stylesheet');
      style.setAttribute('href', url);
      document.head.appendChild(style);
    });
    this.textYPosition = this.getTextYPosition(window.innerWidth, window.innerHeight);
    const slideRef = this.element.shadowRoot.getElementById('slide-ref');
    this.positionningElements(window.innerWidth, slideRef);
    this.interval = setTimeout(() => this.swipeLeft(), 15000);
  }

  disconnectedCallback () {
    clearTimeout(this.interval);

  }

  swipeRight() {
    clearTimeout(this.interval);

    //Calculate new slider position
    const newSliderPosition = this.sliderDatas.sliderPosition + this.sliderDatas.totalSlideSize;
    this.sliderDatas.sliderPosition = newSliderPosition;

    // Increment current index
    this.sliderDatas.currentIndex = this.sliderDatas.currentIndex - 1;

    this.sliderDatas = Object.assign({}, this.sliderDatas);

    // If slider reach end, remove animation and go back at the beginning
    if (this.sliderDatas.currentIndex == 1) {
        setTimeout(() => {
            // Disallow animation
            this.noAnimate = true

            // Re-init slider position
            const newSliderPosition = (-1 * (this.sliderDatas.totalSlideSize * (this.slider.initialLength + 1))) + this.sliderDatas.startPosition;
            this.sliderDatas.sliderPosition = newSliderPosition;

            // Re-init current index
            const newIndex = this.slider.initialLength + 1;
            this.sliderDatas.currentIndex = newIndex;

            this.sliderDatas = Object.assign({}, this.sliderDatas);

            // After few ms, allow animation
            setTimeout(() => this.noAnimate = false, 100);
        }, 900);
    }

    this.interval = setTimeout(() => this.swipeLeft(), 15000);
  }

  swipeLeft() {
    clearTimeout(this.interval);

    //Calculate new slider position
    const newSliderPosition = this.sliderDatas.sliderPosition - this.sliderDatas.totalSlideSize;
    this.sliderDatas.sliderPosition = newSliderPosition;

    // Increment current index
    this.sliderDatas.currentIndex = this.sliderDatas.currentIndex + 1;
    
    this.sliderDatas = Object.assign({}, this.sliderDatas);

    // If slider reach end, remove animation and go back at the beginning
    if (this.sliderDatas.currentIndex == this.slider.initialLength + 2) {
        setTimeout(() => {
            // Disallow animation
            this.noAnimate = true;

            // Re-init slider position
            const newSliderPosition = -1 * (this.sliderDatas.totalSlideSize*2) + this.sliderDatas.startPosition;
            this.sliderDatas.sliderPosition = newSliderPosition;

            // Re-init current index
            this.sliderDatas.currentIndex = 2;

            this.sliderDatas = Object.assign({}, this.sliderDatas);

            // After few ms, allow animation
            setTimeout(() => this.noAnimate = false, 100);
        }, 900);
    }

    this.interval = setTimeout(() => this.swipeLeft(), 15000);
  }

  // Set horizontal position of slider depending of elements size
  positionningElements(windowWidth: number, slideRef: any) {
    this.sliderDatas.currentIndex = 2;

    const totalMargin = this.slideMargin * 2;
    const totalSlideSize = slideRef.offsetWidth + totalMargin;

    const startPosition = (windowWidth - totalSlideSize) / 2;
    this.sliderDatas.startPosition = startPosition;

    const sliderPosition = -1 * (totalSlideSize*2) + startPosition;
    this.sliderDatas.sliderPosition = sliderPosition;

    this.sliderDatas.totalSlideSize = totalSlideSize;

    this.sliderDatas = Object.assign({}, this.sliderDatas);
  }

  // Set vertical position of Destination Title depending of screen size
  getTextYPosition(windowWidth: number, windowHeight: number): string {
    if (windowHeight < 780 && windowWidth < 768) {
        return '35%';
    } else {
        if (windowWidth < 425) {
            return '35%';
        } else if (windowWidth < 768) {
            return '40%';
        } else {
            return '400';
        }
    }
  }

  render() {
    return (
      <Host>
        <div class="carousel">
              <div class="swipe-right" onClick={() => this.swipeRight()} />
              <div class="swipe-left"  onClick={() => this.swipeLeft()} />
  
              <Fragment>{this.slider.slider.map((item, index) => (
                  <div
                      key={`carousel-image-${index}`}
                      class={`carousel-image ${this.sliderDatas.currentIndex === index ? 'active' : ''} ${this.noAnimate ? 'no-animate': ''}`}
                      style={{backgroundImage: `url(${item.image})`}} />
              ))}</Fragment>
              <Fragment>{this.slider.slider.map((item, index) => (
                  <div 
                      key={`carousel-description-${index}`}
                      class={` carousel-description ${this.sliderDatas.currentIndex === index ? 'active' : ''}`}
                  >
                      <span>{item.description}</span>
                      <a href={item.url} class="carousel-link">
                          Lire
                      </a>
                  </div>
              ))}</Fragment>
              <div class="title-carousel-wrapper">
                  <div class={`title-carousel ${this.noAnimate ? 'no-animate': ''}`} style={{left: `${this.sliderDatas.sliderPosition}px`}}>
                      {this.slider.slider.map((item, index) => (
                          <div key={`carousel-slider-${index}`} class="title-carousel-slide" id="slide-ref">
                              <svg class="title-carousel-slide-text" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fill={this.sliderDatas.currentIndex === index ? '#fff' : 'transparent'}>
                                  <text 
                                      x="50%" 
                                      y={this.textYPosition} 
                                      text-anchor="middle" 
                                      font-size="200" 
                                      stroke="#fff" 
                                      stroke-width={this.sliderDatas.currentIndex === index ? 0 : 1} 
                                      font-family="Playfair Display"
                                      class={this.noAnimate ? 'no-animate' : ''}
                                  >
                                      {item.title}
                                  </text>
                              </svg>
                          </div>
                      ))}
                  </div>
              </div>
              { this.withScroll ? <q-scrollicon></q-scrollicon> : null }
          </div>
          {/* <div style={{display: 'none'}} >
            <slot></slot>
          </div> */}
      </Host>
    );
  }
}
