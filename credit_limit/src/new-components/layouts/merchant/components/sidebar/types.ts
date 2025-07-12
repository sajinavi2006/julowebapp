type IconProps = (props: {
  isHovered: boolean;
  isSelected: boolean;
}) => void;

export interface MenuProps {
  name: string;
  label: string;
  icon: IconProps;
  href: string;
}

export interface SidebarProps {
  menu: MenuProps[];
}
export interface SidebarMenuProps extends React.HTMLProps<HTMLDivElement> {
  href?: string;
  icon: IconProps;
}
