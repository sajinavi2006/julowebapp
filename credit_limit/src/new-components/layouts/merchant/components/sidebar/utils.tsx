import { MenuProps } from "./types";

import SidebarMenu from './SidebarMenu';

export function renderMenu(menu: MenuProps) {
  
    const { name, label, ...resProps } = menu;
  
    return (
      <SidebarMenu key={name} {...resProps}>
        {label}
      </SidebarMenu>
    );
  }