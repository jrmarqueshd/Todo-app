import { render, screen } from "@testing-library/react"
import TabsPanel from "."
import { TabItem } from "./interfaces"

describe("TabsPanel test", () => {
  it("Should render correctly", async () => {
    const tabItems: TabItem[] = [
      { tabtitle: "Title test 1", tabContent: "Content test 1" },
      { tabtitle: "Title test 2", tabContent: "Content test 2" }
    ]

    render(<TabsPanel tabItems={[...tabItems]} />);
    expect(await screen.findAllByRole("tab")).toHaveLength(2);
    expect(await screen.findAllByRole("tabpanel")).toHaveLength(2);
  })
})