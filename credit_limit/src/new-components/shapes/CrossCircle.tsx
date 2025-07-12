import { SVGProps } from 'react';

const CrossCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill='#C2C2C2'
    {...props}
  >
    <path d='M18.789 18.789A9.6 9.6 0 1 1 5.212 5.213 9.6 9.6 0 0 1 18.79 18.789ZM9.605 8.415a1.2 1.2 0 0 0-.853 2.034L10.304 12l-1.552 1.552a1.2 1.2 0 1 0 1.697 1.697L12 13.697l1.552 1.552a1.2 1.2 0 0 0 1.697-1.697L13.697 12l1.552-1.551a1.2 1.2 0 0 0-1.697-1.697L12 10.304 10.45 8.752a1.2 1.2 0 0 0-.844-.337Z' />
  </svg>
);
export default CrossCircle;
