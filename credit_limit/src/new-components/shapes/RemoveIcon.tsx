import { SVGProps } from 'react';

const RemoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='#C2C2C2'
    {...props}
  >
    <path
      d='M18.787 18.789A9.6 9.6 0 1 1 5.21 5.212 9.6 9.6 0 0 1 18.787 18.79ZM9.603 8.415a1.2 1.2 0 0 0-.853 2.034L10.302 12 8.75 13.552a1.2 1.2 0 1 0 1.697 1.697l1.551-1.552 1.552 1.552a1.2 1.2 0 0 0 1.697-1.697L13.695 12l1.552-1.551a1.2 1.2 0 0 0-1.697-1.697l-1.552 1.552-1.551-1.552a1.2 1.2 0 0 0-.844-.337Z'
    />
  </svg>
);
export default RemoveIcon;
