import React, { useState } from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './TabPanel';
import { tabsCx } from './styles';
import { TabsProps } from './types';

const Tabs: React.FC<TabsProps> = ({ tabs, className }) => {
  const [value, setValue] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  return (
    <div id='tabs-component' css={tabsCx} className={className}>
      <MuiTabs value={value} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
          />
        ))}
      </MuiTabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </div>
  );
};

export default Tabs;
