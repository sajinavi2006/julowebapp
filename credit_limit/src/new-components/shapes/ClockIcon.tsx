import { SVGProps } from 'react';

const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={15}
    height={15}
    viewBox='0 0 15 15'
    fill='#404040'
    {...props}
  >
    <path d='M11.46 11.46a5.6 5.6 0 1 1-7.92-7.92 5.6 5.6 0 0 1 7.92 7.92ZM7.995 4.205A.7.7 0 0 0 6.8 4.7v2.8a.7.7 0 0 0 .205.495l1.98 1.98a.7.7 0 0 0 .99-.99L8.2 7.211V4.7a.7.7 0 0 0-.205-.496Z' />
  </svg>
);
export default ClockIcon;
