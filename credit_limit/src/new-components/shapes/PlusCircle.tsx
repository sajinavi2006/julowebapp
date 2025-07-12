import { SVGProps } from 'react';

const PlusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={25}
    fill='#006790'
    {...props}
  >
    <path d='M18.789 19.289A9.6 9.6 0 1 1 5.212 5.713 9.6 9.6 0 0 1 18.79 19.289Zm-5.94-11.237A1.2 1.2 0 0 0 10.8 8.9v2.4H8.4a1.2 1.2 0 1 0 0 2.4h2.4v2.4a1.2 1.2 0 1 0 2.4 0v-2.4h2.4a1.2 1.2 0 1 0 0-2.4h-2.4V8.9a1.2 1.2 0 0 0-.351-.848Z' />
  </svg>
);
export default PlusCircle;
