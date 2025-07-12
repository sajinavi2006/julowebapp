import { FC, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { cx } from '@emotion/css';

import runIfFn from '@julofinance/web-helpers/dist/fn/runIfFn';

import useHandleMenuState from './usecase/use-handle-menu-state';
import { SidebarMenuProps } from './types';
import { sidebarMenuCx } from './styles';

const SidebarMenu: FC<SidebarMenuProps> = (props) => {
  const { href, children, className, icon, ...resProps } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();

  const { partnerName } = useParams<{ partnerName: string }>();

  const splittedPathName = pathname.split('/');

  const { isHovered, isSelected } = useHandleMenuState({
    elementRef: ref,
    currentPath: splittedPathName.slice(3, splittedPathName.length).join('/'),
    href,
  });

  return (
    <Link 
    to={href !== undefined ? `/merchant/${partnerName}/${href}` : '#'}
    
    >
      <div
        ref={ref}
        className={cx({ selected: isSelected }, className)}
        css={sidebarMenuCx}
        {...resProps}
      >
        <span className='menu-icon'>
          {runIfFn(icon, { isHovered, isSelected })}
        </span>
        {children}
      </div>
    </Link>
  );
};

export default SidebarMenu;
