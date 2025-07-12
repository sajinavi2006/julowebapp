import { useRLogout } from 'repositories/merchant/auth';
import { LogoutFilled } from 'new-components/shapes';

import SidebarMenu from './SidebarMenu';
import { sidebarCx } from './styles';
import { renderMenu } from './utils';
import { SidebarProps } from './types';

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { menu } = props;
  const { mutate } = useRLogout();

  return (
    <aside css={sidebarCx}>
      <div className='sidebar-main-menu'>
        {menu.map(renderMenu)}
        
        <div className='logout-menu'>
          <SidebarMenu
            onClick={() => mutate({})}
            icon={({ isHovered }) => (
              <LogoutFilled
                {...(isHovered && {
                  fill: '#ffffff',
                })}
              />
            )}
          >
            Logout
          </SidebarMenu>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
