import { Pane, Paragraph } from "evergreen-ui";
import { editor } from "../../../../Models/EditorModel";
import { widgetlist } from "../../../../Plugins/widgetList";

export function WidgetPallette(props) {
  const list = widgetlist

  return (
    <Pane
      key={props.tab}
      id={`panel-${props.tab}`}
      role="tabpanel"
      aria-labelledby={props.tab}
      aria-hidden={props.index !== props.selectedIndex}
      height="100%"
      width="100%"
      display={props.isActive ? "block" : "none"}
    >
      {list.map((elem, index) => {
        if (elem.type === "widget") {
          return <WidgetType key={index} data={elem.data} icon={elem.icon} label={elem.label} />;
        } else {
          return <h4 key={index}>{elem.label}</h4>;
        }
      })}
    </Pane>
  );
}

function WidgetType(props) {
  return (
    <Pane
      width="100%"
      height="40px"
      borderBottom="1px solid #e0e0e0"
      // background="white"
      borderRadius="5px"
      // backgroundColor="white"
      display="flex"
      flexFlow="row"
      alignItems="center"
      draggable={true}
      
      onDragStart = {()=>{editor.currentData = props.data}}
    >
      <img
        src={props.icon}
        style={{ maxWidth: "30px", maxHeight: "100%" }}
        alt={props.label}
      />

      <Paragraph>{props.label}</Paragraph>
    </Pane>
  );
}
