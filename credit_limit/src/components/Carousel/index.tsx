import { Carousel as ReactCarousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { CarouselWrapper } from './styles';

interface Props {
  children: React.ReactElement[];
  dotSelectedColor?: string;
  dotUnselectedColor?: string;
  infinite?: boolean;
  showArrows?: boolean;
  indicators?: boolean;
  swipeable?: boolean;
  autoPlay?: boolean;
  interval?: number;
  onChange?: () => void;
  selectedItem?: number;
}
const Carousel: React.FC<Props> = ({
  children,
  dotSelectedColor,
  dotUnselectedColor,
  infinite,
  showArrows,
  indicators,
  swipeable,
  autoPlay,
  interval,
  onChange,
  selectedItem,
}) => {
  return (
    <CarouselWrapper
      dotSelectedColor={dotSelectedColor}
      dotUnselectedColor={dotUnselectedColor}
    >
      <ReactCarousel
        showThumbs={false}
        infiniteLoop={infinite || false}
        showArrows={showArrows || false}
        showStatus={false}
        showIndicators={indicators || true}
        swipeable={swipeable || true}
        emulateTouch={true}
        autoPlay={autoPlay || false}
        interval={interval || 5000}
        selectedItem={selectedItem}
        onChange={onChange}
      >
        {children}
      </ReactCarousel>
    </CarouselWrapper>
  );
};

export default Carousel;
