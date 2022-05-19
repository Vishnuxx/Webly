import style from "./widgetspane.module.css";
import { Tablist, Tab, Pane, Paragraph } from "evergreen-ui";
import { useState } from "react";
import { WidgetPallette } from "./WidgetPallette/WidgetPallette";
import { ComponentPallette } from "./ComponentPallette/ComponentPallette";
export function WidgetsPane(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [tabs] = useState(["Widgets" , "Components"]);
  return (
    <section className={style.widgetspane}>
      <Tablist
        width="100%"
        minHeight="30px"
        display="flex"
        justifyContent="space-evenly"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            id={tab}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
            aria-controls={`panel-${tab}`}
          >
            {tab}
          </Tab>
        ))}
      </Tablist>
      <Pane padding={10} background="tint1" flex="1" width="100%" overflowY="scroll" overflowX="hidden">
        <WidgetPallette isActive = {selectedIndex === 0}/>
        <ComponentPallette isActive = {selectedIndex === 1}/>
        
      </Pane>
    </section>
  );
}
