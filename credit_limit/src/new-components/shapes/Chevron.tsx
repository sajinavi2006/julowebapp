import { SVGProps } from 'react';

const Chevron = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='20'
    height='20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M9.692 7.999a.867.867 0 0 1-.254.613l-2.94 2.94a.471.471 0 1 1-.668-.666L8.716 8 5.83 5.112a.47.47 0 1 1 .666-.667l2.942 2.942a.867.867 0 0 1 .254.612z'
    />
  </svg>
);
export default Chevron;
