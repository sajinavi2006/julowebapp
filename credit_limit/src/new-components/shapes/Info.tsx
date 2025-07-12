import { SVGProps } from 'react';
const Info = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    viewBox='0 0 16 16'
    fill='#2656C6'
    {...props}
  >
    <path d='M12.525 12.525a6.4 6.4 0 1 0-9.05-9.05 6.4 6.4 0 0 0 9.05 9.05Zm-3.96-7.16a.8.8 0 1 1-1.13-1.13.8.8 0 0 1 1.13 1.13Zm-1.93 2.07A.8.8 0 0 1 7.2 7.2H8a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1 0 1.6H8a.8.8 0 0 1-.8-.8V8.8a.8.8 0 0 1-.566-1.366Z' />
  </svg>
);
export default Info;
