import styled from "@emotion/styled";

interface ICarouselWrapper {
  dotUnselectedColor?: string;
  dotSelectedColor?: string;
}

export const CarouselWrapper = styled.div<ICarouselWrapper>`
  position: relative;
  width: 100%;

  .carousel .control-dots .dot {
    box-shadow: none;
    background: ${props => props.dotUnselectedColor};
  }

  .carousel .control-dots .dot.selected,
  .carousel .control-dots .dot:hover {
    background: ${props => props.dotSelectedColor};
  }

  .carousel.carousel-slider {
    height: inherit;
  }

  .slider-wrapper {
    height: inherit;
  }

  .slider {
    height: inherit;
  }
`;
