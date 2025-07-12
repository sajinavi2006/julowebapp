import { SVGProps } from 'react';

const Cross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={15}
    height={16}
    fill='none'
    {...props}
  >
    <path
      fill='#00ACF0'
      fillRule='evenodd'
      d='M.652 1.25a1.2 1.2 0 0 1 1.697 0L7.5 6.4l5.151-5.15a1.2 1.2 0 1 1 1.697 1.696L9.197 8.098l5.152 5.151a1.2 1.2 0 0 1-1.697 1.697L7.501 9.794l-5.152 5.152a1.2 1.2 0 0 1-1.697-1.697l5.152-5.151L.652 2.946a1.2 1.2 0 0 1 0-1.697Z'
      clipRule='evenodd'
    />
  </svg>
);
export default Cross;
