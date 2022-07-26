import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { TabsPanelProps } from "./interfaces";

export default function TabsPanel({ tabItems }: TabsPanelProps) {
  return (
    <Tabs>
      <TabList>
        {tabItems.map(({tabtitle}) => (
          <Tab key={tabtitle}>{tabtitle}</Tab>
        ))}
      </TabList>
    
      {tabItems.map(({tabContent}, index) => (
        <TabPanel key={String(index)}>
            {tabContent}
        </TabPanel>
      ))}
    </Tabs>
  )
}