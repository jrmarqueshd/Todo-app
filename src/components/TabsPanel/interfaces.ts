export interface TabItem {
  tabtitle: string, 
  tabContent: React.ReactElement | string
}

export interface TabsPanelProps {
  tabItems: TabItem[]
}