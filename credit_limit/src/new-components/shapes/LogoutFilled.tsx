import { SVGProps } from 'react';

const LogoutFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='#000'
    {...props}
  >
    <path
      fillOpacity={0.54}
      d='m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5ZM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5Z'
    />
  </svg>
);
export default LogoutFilled;
