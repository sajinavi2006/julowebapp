export interface TabData {
  label: string;
  component: JSX.Element;
}

export interface TabsProps {
  tabs: TabData[];
  className?: string;
}
