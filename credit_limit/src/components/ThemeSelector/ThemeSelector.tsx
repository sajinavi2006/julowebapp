import React from 'react';
import { ThemeSelectorProps } from './types';

const CermatiTheme = React.lazy(
  () =>
    import(
      /* webpackChunkName: "theme-selector-cermati-component" */ '../../themes/cermati'
    ),
);

const ThemeSelector = ({ children }: ThemeSelectorProps) => {
  return (
    <>
      <React.Suspense fallback={<div />}>
        <CermatiTheme />
      </React.Suspense>
      {children}
    </>
  );
};

export default ThemeSelector;
