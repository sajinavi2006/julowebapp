import { SVGProps } from 'react';

const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    {...props}
  >
    <path
      fill='#2656C6'
      d='M12.525 12.525a6.4 6.4 0 1 0-9.051-9.05 6.4 6.4 0 0 0 9.051 9.05Zm-3.96-7.16a.8.8 0 1 1-1.131-1.131.8.8 0 0 1 1.131 1.131ZM6.634 7.434A.8.8 0 0 1 7.2 7.2H8a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1 0 1.6H8a.8.8 0 0 1-.8-.8V8.8a.8.8 0 0 1-.566-1.366Z'
    />
  </svg>
);
export default InfoIcon;
