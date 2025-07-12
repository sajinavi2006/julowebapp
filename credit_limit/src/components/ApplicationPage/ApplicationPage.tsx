import { forwardRef } from 'react';

import ApplicationHeader from '../ApplicationHeader';
import { ApplicationPageProps } from './types';

const ApplicationPage = forwardRef<HTMLDivElement, ApplicationPageProps>(
  (props, ref) => {
    const { style, useHeader, children, ...resProps } = props;
    return (
      <div
        {...resProps}
        ref={ref}
        style={{
          padding: '0px',
          ...style,
        }}
      >
        {useHeader && <ApplicationHeader />}
        {children}
      </div>
    );
  },
);

export default ApplicationPage;
