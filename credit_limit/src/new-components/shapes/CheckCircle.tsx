import { SVGProps } from 'react';

const CircleCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={26}
    height={26}
    fill='#BBB'
    {...props}
  >
    <path d='M12.8 2.333A10.667 10.667 0 1 0 23.467 13 10.678 10.678 0 0 0 12.8 2.333Z' />
    <path
      fill='#fff'
      d='m18.205 10.74-5.778 5.777a.887.887 0 0 1-1.257 0l-2.89-2.89a.89.89 0 1 1 1.258-1.257l2.26 2.26 5.15-5.148a.89.89 0 0 1 1.257 1.258Z'
    />
  </svg>
);
export default CircleCheck;
