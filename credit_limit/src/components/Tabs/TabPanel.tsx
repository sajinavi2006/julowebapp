import React from 'react';
import Slide from '@material-ui/core/Slide';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      className='tab-panel-component'
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Slide direction='left' in={value === index} mountOnEnter unmountOnExit>
        {value === index ? <div>{children}</div> : <div/>}
      </Slide>
    </div>
  );
};

export default TabPanel;
