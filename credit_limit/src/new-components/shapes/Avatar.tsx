import { SVGProps } from 'react';

const Avatar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={33}
    fill='none'
    {...props}
  >
    <rect width={32} height={32} y={0.5} fill='#fff' rx={16} />
    <path
      fill='#939598'
      d='M16 16.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z'
    />
  </svg>
);
export default Avatar;
